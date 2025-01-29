import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  m_symbolId: {
    type: Number,
    required: true,
  },
  m_price: {
    type: Number,
    required: true,
  },
  m_qty: {
    type: Number,
    required: true,
  },
  m_side: {
    type: String,
    required: true,
  },
});

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
