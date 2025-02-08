const { Project, Portfolio } = require('../models');

const addProject = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    const project = await Project.create({
      ...req.body,
      PortfolioId: portfolio.id
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProject
};