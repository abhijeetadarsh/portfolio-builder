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

export { Certificate, Portfolio, PortfolioCertificate, PortfolioProject, Project, User };
