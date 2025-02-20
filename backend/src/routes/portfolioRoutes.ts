import { Router } from "express";

import upload from "../config/multer.js";
import {
  createPortfolio,
  deletePortfolio,
  getPortfolioByLink,
  updatePortfolio,
} from "../controllers/portfolioController.js";
import authenticate from "../middleware/authMiddleware.js";
import { checkPortfolioOwnership } from "../middleware/ownershipMiddleware.js";
import { validatePortfolio } from "../middleware/validationMiddleware.js";

const router: Router = Router();

router.post("/", authenticate, validatePortfolio, createPortfolio);

router.put("/:id", authenticate, checkPortfolioOwnership, validatePortfolio, updatePortfolio);

router.delete("/:id", authenticate, checkPortfolioOwnership, deletePortfolio);

router.get("/share/:link", getPortfolioByLink);

// router.post("/:id/projects", authenticate, checkPortfolioOwnership, projectValidation, addProject);

// router.post("/:id/certificates", authenticate, checkPortfolioOwnership, certificateValidation, addCertificate);

// router.post("/upload", authenticate, upload.single("file"), (req: Request, res: Response): void => {
//   const fileUrl = `/uploads/${(req.file as Express.Multer.File).filename}`;
//   res.json({ url: fileUrl });
// });

export default router;
