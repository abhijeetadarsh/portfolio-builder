import { NextFunction, Request, Response } from "express";

import Portfolio from "../models/Portfolio.js";
import Project from "../models/Project.js";

const checkProjectOwnership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findByPk(req.body.projectId);
    if (!project || project.userId !== res.locals.user.id) {
      res.status(403).json({ error: "Unauthorized access" });
      return;
    }
    next();
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const checkPortfolioOwnership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const portfolio = await Portfolio.findOne({
      where: { id: req.params.id, userId: res.locals.user.id },
    });
    if (!portfolio) {
      res.status(404).json({ error: "Portfolio not found" });
      return;
    }
    res.locals.portfolio = portfolio;
    next();
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export { checkPortfolioOwnership, checkProjectOwnership };
