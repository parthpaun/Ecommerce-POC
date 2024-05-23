const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, isRequred: true, ref: "User" },
  address_line1: { type: String, required: true },
  address_line2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postal_code: { type: Number, isRequred: true },
  isDefault: { type: Boolean, default: false  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
