// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const { authenticateToken, authenticateRole } = require("./middleware");

// Middleware
app.use(cors());
app.use(express.json());

require("./config/db");

// Routes
// const authRoutes = require("./routes/auth");
// const videoRoutes = require("./routes/video");
// app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use(
  "/api/admin",
  authenticateToken,
  authenticateRole("admin"),
  adminRoutes
);

// Error handling middleware
// const errorMiddleware = require("./middleware");
// app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
