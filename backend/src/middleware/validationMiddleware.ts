import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Shared schemas
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must contain at least one letter and one number");

const urlSchema = z.string().url("Invalid URL format").optional().nullable();

// Auth schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: passwordSchema,
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
});

// Portfolio schema
const portfolioSchema = z.object({
  template: z.enum(["modern", "classic", "minimal"], {
    errorMap: () => ({ message: "Invalid template type" }),
  }),
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
  skills: z.array(z.string()).optional(),
  projectIds: z.array(z.number().positive()).optional(),
  certificateIds: z.array(z.number().positive()).optional(),
});

// Project schema
const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().max(1000, "Description cannot exceed 1000 characters").optional(),
  githubUrl: z
    .string()
    .url("Invalid URL format")
    .regex(/^https?:\/\/(www\.)?github\.com/, "Must be a valid GitHub URL")
    .optional(),
  repoUrl: urlSchema,
  demoUrl: urlSchema,
  images: z.array(z.string().url("Invalid image URL")).optional(),
});

// Certificate schema
const certificateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  issuer: z.string().min(2, "Issuer must be at least 2 characters").max(50, "Issuer cannot exceed 50 characters"),
  issueDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string") {
        // Assume date is in YYYY-MM-DD
        const parts = arg.split("-");
        if (parts.length === 3 && parts[0].length === 4) {
          return new Date(arg);
        }
      }
      return new Date("invalid-date");
    },
    z.date().refine((date) => date <= new Date(), {
      message: "Issue date cannot be in the future",
    })
  ),
  url: urlSchema,
});

// Types
type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;
type PortfolioInput = z.infer<typeof portfolioSchema>;
type ProjectInput = z.infer<typeof projectSchema>;
type CertificateInput = z.infer<typeof certificateSchema>;

// Generic validation middleware
const validate = (schema: z.ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await schema.parseAsync(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Internal server error during validation",
    });
  }
};

// Export validation middlewares
const validateLogin = validate(loginSchema);
const validateRegister = validate(registerSchema);
const validatePortfolio = validate(portfolioSchema);
const validateProject = validate(projectSchema);
const validateCertificate = validate(certificateSchema);

export {
  validateLogin,
  validateRegister,
  validatePortfolio,
  validateProject,
  validateCertificate,
  type LoginInput,
  type RegisterInput,
  type PortfolioInput,
  type ProjectInput,
  type CertificateInput,
};
