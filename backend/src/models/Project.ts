import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../config/database.js";

// Define the attributes for the Project model
interface ProjectAttributes {
  id: number;
  title: string;
  description?: string;
  githubUrl?: string;
  demoUrl?: string;
  images: string[];
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define attributes for creating a new Project instance
interface ProjectCreationAttributes
  extends Optional<ProjectAttributes, "id" | "description" | "githubUrl" | "demoUrl" | "images" | "createdAt" | "updatedAt"> {}

// Create the Project model class
class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public githubUrl?: string;
  public demoUrl?: string;
  public images!: string[];
  public userId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    demoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "projects",
    timestamps: true,
  }
);

export default Project;
