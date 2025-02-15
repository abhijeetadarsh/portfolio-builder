import { Request, Response } from "express";

import { Portfolio, Project } from "../models/index.js";

const addProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.create({
      ...req.body,
      userId: res.locals.user.id,
    });

    await res.locals.portfolio.addProject(project.id);
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { addProject };
