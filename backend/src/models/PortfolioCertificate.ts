import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

interface PortfolioCertificateAttributes {
  portfolioId: number;
  certificateId: number;
}

class PortfolioCertificate extends Model<PortfolioCertificateAttributes> implements PortfolioCertificateAttributes {
  public portfolioId!: number;
  public certificateId!: number;
}

PortfolioCertificate.init(
  {
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    certificateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "PortfolioCertificates",
    timestamps: false,
  }
);

export default PortfolioCertificate;
