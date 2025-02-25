import Certificate from "./Certificate.js";
import Portfolio from "./Portfolio.js";
import PortfolioCertificate from "./PortfolioCertificate.js";
import PortfolioProject from "./PortfolioProject.js";
import Project from "./Project.js";
import User from "./User.js";

// User-Portfolio Associations
User.hasMany(Portfolio, { foreignKey: "userId", onDelete: "CASCADE" });
Portfolio.belongsTo(User, { foreignKey: "userId" });

// User-Project Associations
User.hasMany(Project, { foreignKey: "userId", onDelete: "CASCADE" });
Project.belongsTo(User, { foreignKey: "userId" });

// User-Certificate Associations
User.hasMany(Certificate, { foreignKey: "userId", onDelete: "CASCADE" });
Certificate.belongsTo(User, { foreignKey: "userId" });

// Portfolio-Project Many-to-Many Associations
Portfolio.belongsToMany(Project, {
  through: PortfolioProject,
  foreignKey: "portfolioId",
  otherKey: "projectId",
  onDelete: "CASCADE",
});
Project.belongsToMany(Portfolio, {
  through: PortfolioProject,
  foreignKey: "projectId",
  otherKey: "portfolioId",
  onDelete: "CASCADE",
});

// Portfolio-Certificate Many-to-Many Associations
Portfolio.belongsToMany(Certificate, {
  through: PortfolioCertificate,
  foreignKey: "portfolioId",
  otherKey: "certificateId",
  onDelete: "CASCADE",
});
Certificate.belongsToMany(Portfolio, {
  through: PortfolioCertificate,
  foreignKey: "certificateId",
  otherKey: "portfolioId",
  onDelete: "CASCADE",
});



PortfolioCertificate.beforeBulkCreate(async (instances, options) => {
  console.log("Gadha PortfolioCertificate.beforeBulkCreate", instances);
  if (!instances || !Array.isArray(instances)) {
    return;
  }
  
  for (const instance of instances) {
    const portfolio = await Portfolio.findByPk(instance.portfolioId);
    const certificate = await Certificate.findByPk(instance.certificateId);
    
    console.log("Suar PortfolioCertificate.beforeBulkCreate", portfolio, certificate);
    if (!portfolio || !certificate) {
      throw new Error("Portfolio or Certificate not found");
    }
    
    if (portfolio.userId !== certificate.userId) {
      throw new Error(`Certificate ${certificate.id} belongs to user ${certificate.userId} but portfolio belongs to user ${portfolio.userId}`);
    }
  }
});

PortfolioCertificate.beforeCreate(async (instance, options) => {
  console.log("PortfolioCertificate.beforeCreate", instance);
  const portfolio = await Portfolio.findByPk(instance.portfolioId);
  const certificate = await Certificate.findByPk(instance.certificateId);

  if (!portfolio || !certificate) {
    throw new Error("Portfolio or Certificate not found");
  }

  if (portfolio.userId !== certificate.userId) {
    throw new Error("Cannot associate a Certificate with a Portfolio from different users");
  }
});

PortfolioCertificate.beforeUpdate(async (instance, options) => {
  console.log("PortfolioCertificate.beforeUpdate", instance);
  const portfolio = await Portfolio.findByPk(instance.portfolioId);
  const certificate = await Certificate.findByPk(instance.certificateId);

  if (!portfolio || !certificate) {
    throw new Error("Portfolio or Certificate not found");
  }

  if (portfolio.userId !== certificate.userId) {
    throw new Error("Cannot associate a Certificate with a Portfolio from different users");
  }
});


PortfolioProject.beforeBulkCreate(async (instances, options) => {
  if (!instances || !Array.isArray(instances)) {
    return;
  }
  
  for (const instance of instances) {
    const portfolio = await Portfolio.findByPk(instance.portfolioId);
    const project = await Project.findByPk(instance.projectId);
    
    if (!portfolio || !project) {
      throw new Error("Portfolio or Project not found");
    }
    
    if (portfolio.userId !== project.userId) {
      throw new Error(`Project ${project.id} belongs to user ${project.userId} but portfolio belongs to user ${portfolio.userId}`);
    }
  }
});

PortfolioProject.beforeCreate(async (instance, options) => {
  console.log("PortfolioProject.beforeCreate", instance);
  const portfolio = await Portfolio.findByPk(instance.portfolioId);
  const project = await Project.findByPk(instance.projectId);

  if (!portfolio || !project) {
    throw new Error("Portfolio or Project not found");
  }

  if (portfolio.userId !== project.userId) {
    throw new Error("Cannot associate a Project with a Portfolio from different users");
  }
});

PortfolioProject.beforeUpdate(async (instance, options) => {
  console.log("PortfolioProject.beforeUpdate", instance);
  const portfolio = await Portfolio.findByPk(instance.portfolioId);
  const project = await Project.findByPk(instance.projectId);

  if (!portfolio || !project) {
    throw new Error("Portfolio or Project not found");
  }

  if (portfolio.userId !== project.userId) {
    throw new Error("Cannot associate a Project with a Portfolio from different users");
  }
});

export { Certificate, Portfolio, PortfolioCertificate, PortfolioProject, Project, User };
