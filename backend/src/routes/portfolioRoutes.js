const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");
const projectController = require("../controllers/projectController");
const certificationController = require("../controllers/certificationController");
const upload = require("../config/multer");
const authenticate = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Portfolio:
 *       type: object
 *       required:
 *         - template
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated portfolio ID
 *         userId:
 *           type: integer
 *           description: ID of the portfolio owner
 *         template:
 *           type: string
 *           description: Portfolio template name
 *         title:
 *           type: string
 *           description: Portfolio title
 *         description:
 *           type: string
 *           description: Portfolio description
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: List of skills
 *         shareableLink:
 *           type: string
 *           description: Unique shareable link
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Project:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated project ID
 *         title:
 *           type: string
 *           description: Project title
 *         description:
 *           type: string
 *           description: Project description
 *         githubUrl:
 *           type: string
 *           description: GitHub repository URL
 *         demoUrl:
 *           type: string
 *           description: Live demo URL
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of project image URLs
 *
 *     Certification:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated certification ID
 *         title:
 *           type: string
 *           description: Certification title
 *         issuer:
 *           type: string
 *           description: Certification issuer
 *         issueDate:
 *           type: string
 *           format: date
 *           description: Date of certification
 *         url:
 *           type: string
 *           description: Certification verification URL
 */

/**
 * @swagger
 * tags:
 *   - name: Portfolios
 *     description: Portfolio management endpoints
 *   - name: Projects
 *     description: Project management endpoints
 *   - name: Certifications
 *     description: Certification management endpoints
 *   - name: Media
 *     description: Media upload endpoints
 */

/**
 * @swagger
 * /api/portfolios:
 *   post:
 *     summary: Create a new portfolio
 *     tags: [Portfolios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'
 *     responses:
 *       201:
 *         description: Portfolio created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       500:
 *         description: Server error
 */
router.post("/", authenticate, portfolioController.createPortfolio);

/**
 * @swagger
 * /api/portfolios/{id}:
 *   put:
 *     summary: Update an existing portfolio
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Portfolio ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'
 *     responses:
 *       200:
 *         description: Portfolio updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       404:
 *         description: Portfolio not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authenticate, portfolioController.updatePortfolio);

/**
 * @swagger
 * /api/portfolios/share/{link}:
 *   get:
 *     summary: Get portfolio by shareable link
 *     tags: [Portfolios]
 *     parameters:
 *       - in: path
 *         name: link
 *         required: true
 *         schema:
 *           type: string
 *         description: Portfolio's unique shareable link
 *     responses:
 *       200:
 *         description: Portfolio details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       404:
 *         description: Portfolio not found
 *       500:
 *         description: Server error
 */
router.get("/share/:link", authenticate, portfolioController.getPortfolioByLink);

/**
 * @swagger
 * /api/portfolios/{id}/projects:
 *   post:
 *     summary: Add a new project to a portfolio
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Portfolio ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Portfolio not found
 *       500:
 *         description: Server error
 */
router.post("/:id/projects", authenticate, projectController.addProject);

/**
 * @swagger
 * /api/portfolios/{id}/certifications:
 *   post:
 *     summary: Add a new certification to a portfolio
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Portfolio ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       201:
 *         description: Certification added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certification'
 *       404:
 *         description: Portfolio not found
 *       500:
 *         description: Server error
 */
router.post("/:id/certifications", authenticate, certificationController.addCertification);

/**
 * @swagger
 * /api/portfolios/upload:
 *   post:
 *     summary: Upload media file
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: URL of the uploaded file
 *       500:
 *         description: Server error
 */
router.post("/upload", authenticate, upload.single("file"), (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
