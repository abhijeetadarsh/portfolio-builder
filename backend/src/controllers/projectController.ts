import { Request, Response } from "express";
import { ValidationError, Op } from "sequelize";
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
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to create project",
      });
    }
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
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        success: false,
        error: "Validation error",
        details: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to update project",
      });
    }
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete project",
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch projects",
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch project",
    });
  }
};

export { createProject, updateProject, deleteProject, getAllProjects, getProjectById };
