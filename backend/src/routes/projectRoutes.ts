import { Router } from "express";

import authenticate from "../middleware/authMiddleware.js";
import { validateProject } from "../middleware/validationMiddleware.js";
import { checkProjectOwnership } from "../middleware/ownershipMiddleware.js";
import {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
} from "../controllers/projectController.js";

const router: Router = Router();

router.post("/", authenticate, validateProject, createProject);

router.put("/:id", authenticate, validateProject, checkProjectOwnership, updateProject);

router.delete("/:id", authenticate, checkProjectOwnership, deleteProject);

router.get("/", authenticate, getAllProjects);

router.get("/:id", authenticate, checkProjectOwnership, getProjectById);

export default router;
