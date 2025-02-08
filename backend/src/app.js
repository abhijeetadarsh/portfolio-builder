const express = require("express");
const cors = require("cors");
const portfolioRoutes = require("./routes/portfolioRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware order matters
app.use(cors());
app.use(express.json());

// Swagger docs should be set up before routes
require("./config/swagger")(app);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolios", portfolioRoutes);

// Error handling (must come AFTER routes)
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
