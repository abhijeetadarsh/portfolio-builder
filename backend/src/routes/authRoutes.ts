import express, { Router } from "express";

import { changePassword, login, register, forgotPassword, resetPassword } from "../controllers/authController.js";
import authenticate from "../middleware/authMiddleware.js";
import {
  validateLogin,
  validateRegister,
  validateChangePassword,
  validateForgotPassword,
  validateResetPassword,
} from "../middleware/validationMiddleware.js";

const router: Router = express.Router();

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

router.put("/change-passwd", authenticate, validateChangePassword, changePassword);

router.post("/forgot-passwd", validateForgotPassword, forgotPassword);

router.post("/reset-passwd", validateResetPassword, resetPassword);

export default router;
