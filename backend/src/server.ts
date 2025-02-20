import "dotenv/config";
import app from "./app.js";
import sequelize, { connect } from "./config/database.js";

if (process.env.NODE_ENV === "development") {
  console.log("ENV:", process.env);
}

const PORT: number = parseInt(process.env.PORT as string) || 3000;

(async () => {
  try {
    await connect();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
