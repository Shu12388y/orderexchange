import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/auth.model";
import jwt from "jsonwebtoken";

export class Auth {
  static async userSignUp(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body; // No need for `await` here
      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
      }

      const findUser = await User.findOne({ username });
      if (findUser) {
        res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createNewUser = new User({
        username,
        password: hashedPassword,
      });
      await createNewUser.save();

      res.status(201).json({ message: "User created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async userSignIn(req: Request, res: Response): Promise<void> {
    try {
      const now = new Date();

      // Convert current time to IST (UTC+5:30)
      const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
      const istTime = new Date(now.getTime() + istOffset);

      const hours = istTime.getUTCHours();
      if (hours >= 10 && hours <= 13) {
        res.status(401).json({ message: `You can't loginnow at ${hours}` });
      } else {
        const { username, password } = req.body; // No need for `await` here
        if (!username || !password) {
          res
            .status(400)
            .json({ message: "Username and password are required" });
        }

        const findUser = await User.findOne({ username });
        if (!findUser) {
          res.status(401).json({ message: "User does not exist" });
        }

        const checkPassword = await bcrypt.compare(password, findUser.password); // Fix order of arguments
        if (!checkPassword) {
          res.status(401).json({ message: "Password incorrect" });
        }

        const createAuthToken = jwt.sign({ userId: findUser._id }, "secret", {
          expiresIn: "1h",
        }); // Add payload and expiration
        res
          .status(200)
          .json({ message: "User logged in", token: createAuthToken });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
