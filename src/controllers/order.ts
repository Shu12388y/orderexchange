import { Response, Request } from "express";
import { redis } from "../utils/redis";
import { Order } from "../models/order.model";

export class OrderManagement {
  private static queue: any[] = [];

  static async placeOrder(req: Request, res: Response): Promise<void> {
    try {
      const { m_symbolId, m_price, m_qty, m_side } = req.body;

      if (!m_symbolId || !m_price || !m_qty || !m_side) {
        res.status(400).json({ message: "Empty order" });
      }

      let remainingQty = parseInt(m_qty);

      if (remainingQty > 100) {
        // Save only the first 100 immediately, queue the rest
        const quantityToProcess = 100;
        remainingQty -= quantityToProcess;

        await redis.set("quantity", quantityToProcess);

        const createNewOrder = new Order({
          m_symbolId: parseInt(m_symbolId),
          m_price: parseInt(m_price),
          m_qty: quantityToProcess,
          m_side,
        });

        await createNewOrder.save();

        // Queue the remaining quantity
        OrderManagement.queue.push({
          m_symbolId,
          m_price,
          m_qty: remainingQty,
          m_side,
        });
      } else {
        // Process normally if <= 100
        await redis.set("quantity", remainingQty);

        const createNewOrder = new Order({
          m_symbolId: parseInt(m_symbolId),
          m_price: parseInt(m_price),
          m_qty: remainingQty,
          m_side,
        });

        await createNewOrder.save();
      }

      await redis.set("quantity", 0);
      res.status(201).json({
        message: {
          m_symbolId,
          m_price,
          m_qty,
          m_side,
        },
      });

      setTimeout(() => OrderManagement.processQueue(), 0);
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  
  private static async processQueue(): Promise<void> {
    while (OrderManagement.queue.length > 0) {
      const order = OrderManagement.queue.shift();

      let remainingQty = parseInt(order.m_qty);
      while (remainingQty > 0) {
        const quantityToProcess = Math.min(remainingQty, 100);
        remainingQty -= quantityToProcess;

        await redis.set("quantity", quantityToProcess);

        const createNewOrder = new Order({
          m_symbolId: parseInt(order.m_symbolId),
          m_price: parseInt(order.m_price),
          m_qty: quantityToProcess,
          m_side: order.m_side,
        });

        await createNewOrder.save();
      }
    }
  }
}
