import { Router } from "express";

import authenticate from "../middleware/authMiddleware.js";
import { validateCertificate } from "../middleware/validationMiddleware.js";
import { checkCertificateOwnership } from "../middleware/ownershipMiddleware.js";
import {
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getAllCertificates,
  getCertificateById,
} from "../controllers/certificateController.js";

const router: Router = Router();

router.post("/", authenticate, validateCertificate, createCertificate);

router.put("/:id", authenticate, validateCertificate, checkCertificateOwnership, updateCertificate);

router.delete("/:id", authenticate, checkCertificateOwnership, deleteCertificate);

router.get("/", authenticate, getAllCertificates);

router.get("/:id", authenticate, checkCertificateOwnership, getCertificateById);

export default router;
