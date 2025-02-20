import { Request, Response } from "express";
import { ValidationError, Op } from "sequelize";
import { Certificate } from "../models/index.js";

const createCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const certificateData = {
      ...req.body,
      userId: res.locals.user.id,
    };

    const newCertificate = await Certificate.create(certificateData);
    res.status(201).json({
      success: true,
      data: newCertificate,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        success: false,
        error: "Invalid input data",
        details: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to create certificate",
      });
    }
  }
};

const updateCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const certificateData = req.body;
    const certificate = (await Certificate.findByPk(id))!;
    
    await certificate.update(certificateData);
    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        success: false,
        error: "Invalid input data",
        details: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to update certificate",
      });
    }
  }
};

const deleteCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const certificate = (await Certificate.findByPk(id))!;

    await certificate.destroy();
    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete certificate",
    });
  }
};

const getAllCertificates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, search } = req.query;
    let whereClause: any = {};

    // Add userId filter if provided
    if (userId) {
      whereClause.userId = userId;
    }

    // Add search filter if provided
    if (search) {
      whereClause[Op.or] = [{ title: { [Op.iLike]: `%${search}%` } }, { issuer: { [Op.iLike]: `%${search}%` } }];
    }

    const certificates = await Certificate.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch certificates",
    });
  }
};

const getCertificateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const certificate = (await Certificate.findByPk(id))!;

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch certificate",
    });
  }
};

export { createCertificate, updateCertificate, deleteCertificate, getAllCertificates, getCertificateById };
