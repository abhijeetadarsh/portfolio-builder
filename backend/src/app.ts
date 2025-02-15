import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import setupSwagger from "./config/swagger.js";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Define an error interface for better type safety
interface AppError extends Error {
  status?: number;
  statusCode?: number;
}

const app: express.Application = express();

// Security middleware should come first
app.use(
  cors({
    // Consider adding specific options for better security
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (consider adding Morgan or Winston here)
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Swagger documentation setup
setupSwagger(app);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolios", portfolioRoutes);

// 404 handler for undefined routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handling middleware
app.use((err: AppError, _req: Request, res: Response, next: NextFunction): void => {
  console.error("Error:", {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;

// /home/bird/Desktop/auro/backend/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node
