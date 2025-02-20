import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { CustomJwtPayload, jwtExpires, jwtSecret } from "../config/auth.js";
import { User } from "../models/index.js";
import { sendEmail } from "../services/emailService.js";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const user = await User.create({ email, password, name });

    res.status(201).json({
      success: false,
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        success: false,
        message: "Email already exists",
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    console.log("Email:", email);
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validPassword(password))) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = res.locals.user!;

    if (!(await user.validPassword(oldPassword))) {
      res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
      return;
    }

    if (newPassword === oldPassword) {
      res.status(400).json({
        success: false,
        message: "New password must be different",
      });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const emailOptions = {
      from: process.env.EMAIL_USER as string,
      to: email as string,
      subject: "Reset Password",
      text: `Click the link below to reset your password: ${resetLink}`,
    };

    await sendEmail(emailOptions);

    res.json({ success: true, message: "Password reset email sent" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload;

    const user = await User.findByPk(decoded.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { changePassword, login, register, forgotPassword, resetPassword };
