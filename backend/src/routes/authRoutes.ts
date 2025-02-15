import express, { Router } from "express";

import { changePassword, login, register } from "../controllers/authController.js";
import authenticate from "../middleware/authMiddleware.js";
import { loginValidation, registerValidation } from "../middleware/validationMiddleware.js";

const router: Router = express.Router();

router.post("/register", registerValidation, register);

router.post("/login", loginValidation, login);

router.put("/change-password", authenticate, changePassword);

export default router;
