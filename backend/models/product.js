const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }, // Linked to Category
  brand: { type: String }, // Optional
  images: [{ type: String }], // Default images (if no variation-specific images)
  attributes: { type: Map, of: String }, // Additional attributes (e.g., material, battery life)
  isNewArrival: { type: Boolean, default: false }, // For filtering new arrivals
  createdAt: { type: Date, default: Date.now },

  // Default price & discount (if variations don't have their own)
  basePrice: { type: Number, required: true },
  baseDiscountPrice: { type: Number },
  variants: [{
    attributes: { type: Map, of: String }, // Example: { "Color": "Peach", "Storage": "128GB" }
    price: Number,
    discount: Number,
    stock: Number,
    images: [String]
  }],
  specifications: [{
    sectionName: String, // Example: "Display Features", "Camera Features"
    attributes: [{ key: String, value: String }]
  }]
});

module.exports = mongoose.model("Product", productSchema);
