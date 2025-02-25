import { Request, Response } from "express";

import { Certificate, Portfolio, Project, User } from "../models/index.js";

const createPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user!;
    const portfolio = await Portfolio.create({
      ...req.body,
      userId: user.id,
      shareableLink: `portfolio-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    });

    res.status(201).json({ success: true, data: portfolio });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const linkProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = res.locals.portfolio!;
    await portfolio.setProjects(req.body.projectIds);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const linkCertificates = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = res.locals.portfolio!;
    await portfolio.setCertificates(req.body.certificateIds);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updatePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = res.locals.portfolio!;
    await portfolio.update(req.body);
    res.json({ success: true, data: portfolio });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const resetShareableLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = res.locals.portfolio!;
    portfolio.shareableLink = `portfolio-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    await portfolio.save();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deletePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = res.locals.portfolio!;
    await portfolio.destroy();
    res.status(204).json({ success: true });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllPortfolios = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolios = await Portfolio.findAll({
      include: [{ model: Project }, { model: Certificate }],
    });
    res.json({ success: true, data: portfolios });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getPortfolioById = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id, {
      include: [{ model: Project }, { model: Certificate }],
    });
    if (!portfolio) {
      res.status(404).json({
        success: false,
        error: "Portfolio not found",
      });
    }
    res.json({ success: true, data: portfolio });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getPortfolioByLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = await Portfolio.findOne({
      where: { shareableLink: req.params.link },
      include: [
        {
          model: User,
          attributes: ["name", "bio", "githubUrl", "linkedinUrl", "twitterUrl"],
        },
        { model: Project },
        { model: Certificate },
      ],
    });
    if (!portfolio) {
      res.status(404).json({
        success: false,
        error: "Portfolio not found",
      });
    }
    res.json({ success: true, data: portfolio });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  createPortfolio,
  linkProjects,
  linkCertificates,
  updatePortfolio,
  resetShareableLink,
  deletePortfolio,
  getAllPortfolios,
  getPortfolioById,
  getPortfolioByLink,
};
