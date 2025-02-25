import { Request, Response } from "express";
import { Certificate } from "../models/index.js";

const createCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user!;
    const certificateData = {
      ...req.body,
      userId: user.id,
    };

    const newCertificate = await Certificate.create(certificateData);
    res.status(201).json({
      success: true,
      data: newCertificate,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const certificate = res.locals.certificate!;

    await certificate.update(req.body);
    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const certificate = res.locals.certificate!;

    await certificate.destroy();
    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllCertificates = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = res.locals.user!;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: certificates } = await Certificate.findAndCountAll({
      where: {
        userId: user.id,
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        certificates,
        pagination: {
          total: count,
          page,
          totalPages,
          hasMore: page < totalPages,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getCertificateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const certificate = res.locals.certificate!;

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { createCertificate, updateCertificate, deleteCertificate, getAllCertificates, getCertificateById };
