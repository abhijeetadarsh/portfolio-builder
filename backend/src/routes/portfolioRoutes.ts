import { Router } from "express";

import authenticate from "../middleware/authMiddleware.js";
import { checkPortfolioOwnership } from "../middleware/ownershipMiddleware.js";
import { validatePortfolio, validateProjectIds, validateCertificateIds } from "../middleware/validationMiddleware.js";
import {
  createPortfolio,
  linkProjects,
  linkCertificates,
  updatePortfolio,
  resetShareableLink,
  deletePortfolio,
  getAllPortfolios,
  getPortfolioById,
  getPortfolioByLink,
} from "../controllers/portfolioController.js";

const router: Router = Router();

router.post("/", authenticate, validatePortfolio, createPortfolio);

router.patch("/:id/projects", authenticate, checkPortfolioOwnership, validateProjectIds, linkProjects);

router.patch("/:id/certificates", authenticate, checkPortfolioOwnership, validateCertificateIds, linkCertificates);

router.put("/:id", authenticate, checkPortfolioOwnership, validatePortfolio, updatePortfolio);

router.patch("/:id/reset-shareable-link", authenticate, checkPortfolioOwnership, resetShareableLink);

router.delete("/:id", authenticate, checkPortfolioOwnership, deletePortfolio);

router.get("/", authenticate, getAllPortfolios);

router.get("/:id", authenticate, checkPortfolioOwnership, getPortfolioById);

router.get("/:link", getPortfolioByLink);

export default router;
