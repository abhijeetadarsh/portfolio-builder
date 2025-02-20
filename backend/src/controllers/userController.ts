import { Request, Response } from "express";

import User from "../models/User.js";

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user!;
    res.json(user);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user!;
    await user.update(req.body);
    console.log(user);

    const updatedUser = await User.findByPk(user.id, {
      attributes: { exclude: ["password"] },
    });

    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getProfile, updateProfile };
