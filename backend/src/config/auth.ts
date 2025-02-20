import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "your-secret-key-here";
const jwtExpires = "24h";

interface CustomJwtPayload extends jwt.JwtPayload {
  id: number;
  email: string;
}

export { jwtExpires, jwtSecret, CustomJwtPayload };
