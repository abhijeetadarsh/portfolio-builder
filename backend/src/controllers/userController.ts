import { Request, Response } from "express";

import User from "../models/User.js";

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!res.locals.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findByPk(res.locals.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!res.locals.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { name, bio, githubUrl, linkedinUrl, twitterUrl } = req.body;

    const user = await User.findByPk(res.locals.user.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await user.update({ name, bio, githubUrl, linkedinUrl, twitterUrl });

    const updatedUser = await User.findByPk(res.locals.user.id, {
      attributes: { exclude: ["password"] },
    });

    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getProfile, updateProfile };
