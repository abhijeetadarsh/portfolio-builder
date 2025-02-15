import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../config/database.js";

// Define the attributes for the Certificate model
interface CertificateAttributes {
  id: number;
  title: string;
  issuer?: string;
  issueDate?: Date;
  url?: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes needed when creating a new Certificate
interface CertificateCreationAttributes
  extends Optional<CertificateAttributes, "id" | "issuer" | "issueDate" | "url" | "createdAt" | "updatedAt"> {}

// Create the Certificate model class
class Certificate extends Model<CertificateAttributes, CertificateCreationAttributes> implements CertificateAttributes {
  public id!: number;
  public title!: string;
  public issuer?: string;
  public issueDate?: Date;
  public url?: string;
  public userId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Certificate.init(
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
  },
  {
    sequelize,
    tableName: "certificates",
    timestamps: true,
  }
);

export default Certificate;
