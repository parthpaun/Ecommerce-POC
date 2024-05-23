// config/db.js
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecom-poc-new';

mongoose
  .connect(MONGODB_URI)
  .then((data) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
