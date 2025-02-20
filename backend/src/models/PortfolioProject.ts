import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

interface PortfolioProjectAttributes {
  portfolioId: number;
  projectId: number;
}

class PortfolioProject extends Model<PortfolioProjectAttributes> implements PortfolioProjectAttributes {
  declare portfolioId: number;
  declare projectId: number;
}

PortfolioProject.init(
  {
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "portfolios_x_projects",
    timestamps: false,
    underscored: true,
  }
);

export default PortfolioProject;
