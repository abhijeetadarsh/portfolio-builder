import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

async function connect(maxRetries = 5, initialDelay = 5000) {
  let retries = 0;
  let currentDelay = initialDelay;

  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log("Database connection established successfully.");
      return;
    } catch (err) {
      retries++;
      console.error(`Database connection failed (attempt ${retries}/${maxRetries})`);

      if (err instanceof Error) {
        console.error("Error details: ", err);
      }

      if (retries === maxRetries) {
        console.error("Maximum retry attempts reached. Exiting...");
        process.exit(1);
      }

      // Exponential backoff
      currentDelay = initialDelay * Math.pow(2, retries - 1);
      console.log(`Waiting ${currentDelay / 1000} seconds before next retry...`);

      await new Promise((res) => setTimeout(res, currentDelay));
    }
  }
}

export default sequelize;
export { connect };
