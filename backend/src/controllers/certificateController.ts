import { Request, Response } from "express";

import { Certificate, Portfolio } from "../models/index.js";

const addCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      res.status(404).json({ error: "Portfolio not found" });
      return;
    }
    const certificate = await Certificate.create({
      ...req.body,
      PortfolioId: portfolio.id,
    });
    res.status(201).json(certificate);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { addCertificate };
