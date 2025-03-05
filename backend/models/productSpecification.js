const mongoose = require("mongoose");

const SpecificationSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  attributes: [
    {
      name: { type: String, required: true }, // e.g., "Operating System"
      value: { type: String, required: true } // e.g., "Android 14"
    }
  ]
});

module.exports = mongoose.model("Specification", SpecificationSchema);
