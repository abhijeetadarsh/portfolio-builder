import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

// Base attributes interface
interface PortfolioCertificateAttributes {
  portfolioId: number;
  certificateId: number;
}

class PortfolioCertificate extends Model<PortfolioCertificateAttributes> implements PortfolioCertificateAttributes {
  declare portfolioId: number;
  declare certificateId: number;
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
    tableName: "portfolios_x_certificates",
    timestamps: false,
    underscored: true,
  }
);

export default PortfolioCertificate;
