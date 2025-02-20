import { Request, Response } from "express";
import { ValidationError, Op } from "sequelize";
import { Project } from "../models/index.js";

const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectData = {
      ...req.body,
      userId: res.locals.user.id,
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
    const { id } = req.params;
    const projectData = req.body;
    // The ! tells TypeScript this will never be null
    const project = (await Project.findByPk(id))!;

    await project.update(projectData);
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
    const { id } = req.params;
    const project = (await Project.findByPk(id))!;

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
    const projects = await Project.findAll();
    res.status(200).json({
      success: true,
      data: projects,
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
    const { id } = req.params;
    const project = (await Project.findByPk(id))!;

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
