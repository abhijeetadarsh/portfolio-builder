import { BelongsToManySetAssociationsMixin, DataTypes, Model, Optional } from "sequelize";

import sequelize from "../config/database.js";
import Certificate from "./Certificate.js";
import Project from "./Project.js";

// Define the attributes for the Portfolio model
interface PortfolioAttributes {
  id: number;
  template: string;
  title: string;
  description?: string;
  skills: string[];
  shareableLink?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define attributes for creating a new Portfolio instance
interface PortfolioCreationAttributes
  extends Optional<PortfolioAttributes, "id" | "description" | "skills" | "shareableLink" | "createdAt" | "updatedAt"> {}

// Extend the Portfolio model to include association mixins
class Portfolio extends Model<PortfolioAttributes, PortfolioCreationAttributes> implements PortfolioAttributes {
  public id!: number;
  public template!: string;
  public title!: string;
  public description?: string;
  public skills!: string[];
  public shareableLink?: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association mixin methods
  public setProjects!: BelongsToManySetAssociationsMixin<Project, number>;
  public setCertificates!: BelongsToManySetAssociationsMixin<Certificate, number>;
}

Portfolio.init(
  {
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
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
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
  },
  {
    sequelize,
    tableName: "portfolios",
    timestamps: true,
  }
);

export default Portfolio;
