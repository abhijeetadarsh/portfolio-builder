const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Certification = sequelize.define('Certification', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  issuer: DataTypes.STRING,
  issueDate: DataTypes.DATE,
  url: DataTypes.STRING
});

module.exports = Certification;