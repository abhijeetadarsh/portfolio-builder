import { DataTypes, InitOptions, Model, ModelAttributes, Optional } from "sequelize";
import sequelize from "../config/database.js";

// Base attributes interface
interface ProjectAttributes {
  readonly id: number;
  title: string;
  description?: string | null;
  repoUrl?: string | null;
  demoUrl?: string | null;
  images?: string[];
  userId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Interface for creating a new project
interface ProjectCreationAttributes extends Omit<ProjectAttributes, "id" | "createdAt" | "updatedAt"> {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Project model class
class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  declare readonly id: number;
  declare title: string;
  declare description: string | null;
  declare repoUrl: string | null;
  declare demoUrl: string | null;
  declare images: string[];
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// Model attributes configuration
const attributes: ModelAttributes<Project, ProjectAttributes> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  repoUrl: {
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
const options: InitOptions<Project> = {
  sequelize,
  tableName: "projects",
  timestamps: true,
  underscored: true,
};

// Initialize the model
Project.init(attributes, options);

export default Project;
