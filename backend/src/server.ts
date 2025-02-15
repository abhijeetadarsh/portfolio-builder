import "dotenv/config";

import app from "./app.js";
import sequelize from "./config/database.js";

if (process.env.NODE_ENV === "development") {
  console.log("ENV:", process.env);
}

const PORT: number = parseInt(process.env.PORT as string) || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
