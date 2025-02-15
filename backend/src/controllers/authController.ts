import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { jwtExpires, jwtSecret } from "../config/auth.js";
import { User } from "../models/index.js";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await User.create({ email, password, name });

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    res.status(500).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Email:", email);
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validPassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: jwtExpires,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!res.locals.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findByPk(res.locals.user.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!(await user.validPassword(oldPassword))) {
      res.status(401).json({ message: "Old password is incorrect" });
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      res.status(400).json({
        message: "New password must be at least 6 characters",
      });
      return;
    }

    if (newPassword === oldPassword) {
      res.status(400).json({ message: "New password must be different" });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { changePassword, login, register };
