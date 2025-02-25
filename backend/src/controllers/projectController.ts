import { Request, Response } from "express";
import { Project } from "../models/index.js";

const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user!;
    const projectData = {
      ...req.body,
      userId: user.id,
    };

    const newProject = await Project.create(projectData);
    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = res.locals.project!;

    await project.update(req.body);
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = res.locals.project!;

    await project.destroy();
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user!;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: projects } = await Project.findAndCountAll({
      where: {
        userId: user.id,
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        projects,
        pagination: {
          total: count,
          page,
          totalPages,
          hasMore: page < totalPages,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = res.locals.project!;

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { createProject, updateProject, deleteProject, getAllProjects, getProjectById };
