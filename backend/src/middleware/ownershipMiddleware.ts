import { NextFunction, Request, Response } from "express";
import { Portfolio, Project, Certificate } from "../models/index.js";
import { ForeignKeyConstraintError, Model, ModelStatic } from "sequelize";

type OwnershipError = {
  status: number;
  message: string;
};

interface OwnedResource {
  id: number;
  userId: number;
}

interface ResponseLocals {
  user: { id: number };
  project?: Project;
  certificate?: Certificate;
  portfolio?: Portfolio;
}

const createOwnershipMiddleware = <T extends Model & OwnedResource, M extends ModelStatic<T>>(
  Model: M,
  resourceName: keyof ResponseLocals
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.params.id) {
        res.status(400).json({
          success: false,
          error: "Resource ID is required",
        });
        return;
      }

      const id = parseInt(req.params.id, 10);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({
          success: false,
          error: "Invalid resource id.",
        });
        return;
      }

      const resource = await Model.findByPk(req.params.id);

      if (!resource) {
        res.status(404).json({
          success: false,
          error: `${resourceName} not found`,
        });
        return;
      }

      if (resource.userId !== res.locals.user.id) {
        res.status(403).json({
          success: false,
          error: `You don't have permission to access this ${resourceName}`,
        });
        return;
      }

      // Store the resource in res.locals for potential future use
      res.locals[resourceName] = resource;
      next();
    } catch (error) {
      const errorResponse = handleOwnershipError(error);
      res.status(errorResponse.status).json({
        success: false,
        error: errorResponse.message,
      });
    }
  };
};

const handleOwnershipError = (error: unknown): OwnershipError => {
  if (error instanceof ForeignKeyConstraintError) {
    return {
      status: 400,
      message: "Invalid resource reference",
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      message: "Internal server error while checking resource ownership",
    };
  }

  return {
    status: 500,
    message: "An unexpected error occurred",
  };
};

// Create middleware instances
const checkProjectOwnership = createOwnershipMiddleware(Project, "project");
const checkCertificateOwnership = createOwnershipMiddleware(Certificate, "certificate");
const checkPortfolioOwnership = createOwnershipMiddleware(Portfolio, "portfolio");

export { checkPortfolioOwnership, checkProjectOwnership, checkCertificateOwnership };
