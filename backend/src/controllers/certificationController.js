const { Certification, Portfolio } = require('../models');

const addCertification = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    const certification = await Certification.create({
      ...req.body,
      PortfolioId: portfolio.id
    });
    res.status(201).json(certification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCertification
};