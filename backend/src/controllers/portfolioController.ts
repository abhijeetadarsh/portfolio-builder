import { Request, Response } from "express";

import sequelize from "../config/database.js";
import { Certificate, Portfolio, Project, User } from "../models/index.js";

const createPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await sequelize.transaction(async (): Promise<void> => {
      const { projectIds, certificateIds, ...portfolioData } = req.body;
      console.log(req.body);

      const portfolio = await Portfolio.create({
        ...portfolioData,
        userId: res.locals.user.id,
        shareableLink: `portfolio-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      });

      console.log(projectIds, certificateIds);
      if (Array.isArray(projectIds) && projectIds.length > 0) {
        console.log("Setting projects");
        await portfolio.setProjects(projectIds);
      }

      if (Array.isArray(certificateIds) && certificateIds.length > 0) {
        console.log("Setting certificates");
        await portfolio.setCertificates(certificateIds);
      }

      const fullPortfolio = await Portfolio.findByPk(portfolio.id, {
        include: [
          {
            model: Project,
            through: { attributes: [] },
          },
          {
            model: Certificate,
            through: { attributes: [] },
          },
        ],
      });

      res.status(201).json(fullPortfolio);
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updatePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    // Only find the portfolio if it belongs to the authenticated user
    const portfolio = await Portfolio.findOne({
      where: {
        id: req.params.id,
        userId: res.locals.user.id, // Ensure ownership
      },
    });

    if (!portfolio) {
      res.status(404).json({ error: "Portfolio not found" });
      return;
    }

    await portfolio.update(req.body);
    res.json(portfolio);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deletePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = await Portfolio.findOne({
      where: {
        id: req.params.id,
        userId: res.locals.user.id, // Ensure ownership
      },
    });

    if (!portfolio) {
      res.status(404).json({ error: "Portfolio not found" });
      return;
    }

    await portfolio.destroy();
    res.status(204).json(); // No content response for successful deletion
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
      res.status(404).json({ error: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { createPortfolio, deletePortfolio, getPortfolioByLink, updatePortfolio };
