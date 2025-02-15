import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/auth.js";
import { AuthContext } from "../context/AuthContext.js";

declare module "express" {
  interface Response {
    locals: AuthContext;
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token: string | undefined = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.locals.user = decoded; // Store user in `res.locals`
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;
