import express, { Router } from "express";

import { changePassword, login, register } from "../controllers/authController.js";
import authenticate from "../middleware/authMiddleware.js";
import { validateLogin, validateRegister } from "../middleware/validationMiddleware.js";

const router: Router = express.Router();

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

router.put("/change-password", authenticate, changePassword);

export default router;
