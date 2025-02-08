const User = require('./User');
const Portfolio = require('./Portfolio');
const Project = require('./Project');
const Certification = require('./Certification');

// Define relationships
User.hasMany(Portfolio);
Portfolio.belongsTo(User);

Portfolio.hasMany(Project);
Project.belongsTo(Portfolio);

Portfolio.hasMany(Certification);
Certification.belongsTo(Portfolio);

module.exports = {
  User,
  Portfolio,
  Project,
  Certification
};