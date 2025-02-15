import express, { Request, Response, Router } from "express";

import upload from "../config/multer.js";
import { addCertificate } from "../controllers/certificateController.js";
import { createPortfolio, deletePortfolio, getPortfolioByLink, updatePortfolio } from "../controllers/portfolioController.js";
import { addProject } from "../controllers/projectController.js";
import authenticate from "../middleware/authMiddleware.js";
import { checkPortfolioOwnership } from "../middleware/ownershipMiddleware.js";
import { certificateValidation, portfolioValidation, projectValidation } from "../middleware/validationMiddleware.js";

const router: Router = express.Router();

router.post("/", authenticate, portfolioValidation, createPortfolio);

router.put("/:id", authenticate, checkPortfolioOwnership, portfolioValidation, updatePortfolio);

router.delete("/:id", authenticate, checkPortfolioOwnership, deletePortfolio);

router.get("/share/:link", getPortfolioByLink);

router.post("/:id/projects", authenticate, checkPortfolioOwnership, projectValidation, addProject);

router.post("/:id/certificates", authenticate, checkPortfolioOwnership, certificateValidation, addCertificate);

router.post("/upload", authenticate, upload.single("file"), (req: Request, res: Response): void => {
  const fileUrl = `/uploads/${(req.file as Express.Multer.File).filename}`;
  res.json({ url: fileUrl });
});

export default router;
