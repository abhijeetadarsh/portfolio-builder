import { DataTypes, InitOptions, Model, ModelAttributes } from "sequelize";

import sequelize from "../config/database.js";

// Base attributes interface
interface CertificateAttributes {
  readonly id: number;
  title: string;
  issuer?: string | null;
  issueDate?: Date | null;
  url?: string | null;
  userId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Interface for creating a new certificate
interface CertificateCreationAttributes extends Omit<CertificateAttributes, "id" | "createdAt" | "updatedAt"> {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Certificate model class
class Certificate extends Model<CertificateAttributes, CertificateCreationAttributes> implements CertificateAttributes {
  declare readonly id: number;
  declare title: string;
  declare issuer: string | null;
  declare issueDate: Date | null;
  declare url: string | null;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// Model attributes configuration
const attributes: ModelAttributes<Certificate, CertificateAttributes> = {
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
  issuer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  issueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
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
const options: InitOptions<Certificate> = {
  sequelize,
  tableName: "certificates",
  timestamps: true,
  underscored: true,
};

// Initialize the model
Certificate.init(attributes, options);

export default Certificate;
