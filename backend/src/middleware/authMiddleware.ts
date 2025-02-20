import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/auth.js";
import { AuthContext } from "../context/AuthContext.js";
import { User } from "../models/index.js";

declare module "express" {
  interface Response {
    locals: AuthContext;
  }
}

interface CustomJwtPayload extends jwt.JwtPayload {
  id: number;
  email: string;
}

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token: string | undefined = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({
      success: false,
      message: "No token provided",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload;
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.locals.user = user; // Store user in `res.locals`
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authenticate;
