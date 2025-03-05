// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const fileUploadRoute = require("./routes/fileUploadRoutes");
const fileUploadController = require("./controllers/fileUploadController");
const { authenticateToken, authenticateRole } = require("./middleware");
const path = require("path");
const multer = require("multer");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

require("./config/db");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
// Routes

app.use(
  "/api/upload",
  upload.any("files"),
  fileUploadRoute
);
app.use("/api/auth", authRoutes);
app.use(
  "/api/admin",
  authenticateToken,
  authenticateRole("admin"),
  adminRoutes
);

// app.use("/api/upload", fileUploadRoute);

// Error handling middleware
// const errorMiddleware = require("./middleware");
// app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
