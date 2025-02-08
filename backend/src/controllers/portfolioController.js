const { Portfolio, Project, Certification, User } = require('../models');

const createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create({
      ...req.body,
      shareableLink: `portfolio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    });
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    await portfolio.update(req.body);
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPortfolioByLink = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      where: { shareableLink: req.params.link },
      include: [
        { model: User, attributes: ['name', 'bio', 'githubUrl', 'linkedinUrl', 'twitterUrl'] },
        { model: Project },
        { model: Certification }
      ]
    });
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPortfolio,
  updatePortfolio,
  getPortfolioByLink
};