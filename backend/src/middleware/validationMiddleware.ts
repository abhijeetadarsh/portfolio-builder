import { NextFunction, Request, Response } from "express";
import { check, matchedData, validationResult } from "express-validator";

// Helper function for URL validation
const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Common validation middleware
const validationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array().map((err) => ({
        message: err.msg,
      })),
    });
    return;
  }

  req.body = matchedData(req, {
    locations: ["body"],
    includeOptionals: true,
  });

  next();
};

const loginValidation = [
  check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format").normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 characters"),
  validationMiddleware,
];

const registerValidation = [
  check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format").normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage("Password must contain at least one letter and one number"),
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Name can only contain letters and spaces"),
  validationMiddleware,
];

const portfolioValidation = [
  check("template")
    .notEmpty()
    .withMessage("Template is required")
    .isString()
    .withMessage("Template must be a string")
    .isIn(["modern", "classic", "minimal"])
    .withMessage("Invalid template type"),
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  check("skills")
    .optional()
    .isArray()
    .withMessage("Skills must be an array")
    .custom((skills: unknown[]) => skills.every((skill) => typeof skill === "string")),
  check("projectIds")
    .optional()
    .isArray()
    .withMessage("Project IDs must be an array")
    .custom((ids: unknown[]) => ids.every((id) => Number.isInteger(id) && (id as number) > 0)),
  check("certificateIds")
    .optional()
    .isArray()
    .withMessage("Certificate IDs must be an array")
    .custom((ids: unknown[]) => ids.every((id) => Number.isInteger(id) && (id as number) > 0)),
  validationMiddleware,
];

const projectValidation = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  check("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  check("githubUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("Invalid GitHub URL")
    .matches(/^https?:\/\/(www\.)?github\.com/)
    .withMessage("Must be a valid GitHub URL"),
  check("demoUrl").optional().trim().isURL().withMessage("Invalid demo URL"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array")
    .custom((images: unknown[]) => images.every((url) => typeof url === "string" && isValidUrl(url))),
  validationMiddleware,
];

const certificateValidation = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  check("issuer")
    .trim()
    .notEmpty()
    .withMessage("Issuer is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Issuer must be between 2 and 50 characters"),
  check("issueDate")
    .notEmpty()
    .withMessage("Issue date is required")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((value: string) => new Date(value) <= new Date()),
  check("url").optional().trim().isURL().withMessage("Invalid certificate URL"),
  check("expiryDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((value: string, { req }) => !value || new Date(value) > new Date(req.body.issueDate)),
  validationMiddleware,
];

export { certificateValidation, loginValidation, portfolioValidation, projectValidation, registerValidation };
