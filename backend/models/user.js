const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone_number: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer"] },
  active: { type: Boolean, default: true },
  addressId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
