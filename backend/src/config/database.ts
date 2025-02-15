import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: (process.env.POSTGRES_HOST || "localhost") as string,
    port: (process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432) as number,
    dialect: "postgres" as const,
    logging: process.env.NODE_ENV === "development" ? true : false,
    pool: {
      max: 5 as number,
      min: 0 as number,
      acquire: 30000 as number,
      idle: 10000 as number,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
