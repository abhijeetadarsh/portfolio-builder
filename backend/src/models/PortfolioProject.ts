import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

interface PortfolioProjectAttributes {
  portfolioId: number;
  projectId: number;
}

class PortfolioProject extends Model<PortfolioProjectAttributes> implements PortfolioProjectAttributes {
  public portfolioId!: number;
  public projectId!: number;
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
    tableName: "PortfolioProjects",
    timestamps: false,
  }
);

export default PortfolioProject;
