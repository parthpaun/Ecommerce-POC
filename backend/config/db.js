// config/db.js
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://parthpaun15:PP12345@parthpaun15.dqfjfoy.mongodb.net/ecom-poc';
mongoose
  .connect(MONGODB_URI)
  .then((data) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
