import { BelongsToManySetAssociationsMixin, DataTypes, InitOptions, Model, ModelAttributes, Optional } from "sequelize";

import sequelize from "../config/database.js";
import Certificate from "./Certificate.js";
import Project from "./Project.js";

// Base attributes interface
interface PortfolioAttributes {
  readonly id: number;
  template: string;
  title: string;
  description?: string | null;
  skills: string[];
  shareableLink?: string | null;
  userId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Interface for creating a new portfolio
interface PortfolioCreationAttributes extends Omit<PortfolioAttributes, "id" | "createdAt" | "updatedAt"> {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Portfolio model class
class Portfolio extends Model<PortfolioAttributes, PortfolioCreationAttributes> implements PortfolioAttributes {
  declare readonly id: number;
  declare template: string;
  declare title: string;
  declare description: string | null;
  declare skills: string[];
  declare shareableLink: string | null;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Association mixin methods
  declare setProjects: BelongsToManySetAssociationsMixin<Project, number>;
  declare setCertificates: BelongsToManySetAssociationsMixin<Certificate, number>;
}

// Model attributes configuration
const attributes: ModelAttributes<Portfolio, PortfolioAttributes> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  template: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    // defaultValue: [],
  },
  shareableLink: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

// Model configuration options
const options: InitOptions<Portfolio> = {
  sequelize,
  tableName: "portfolios",
  timestamps: true,
  underscored: true,
};

// Initialize the model
Portfolio.init(attributes, options);

export default Portfolio;
