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

  variants: [
    {
      attributes: [
        {
          name: { type: String, required: true }, // e.g., "Color"
          value: { type: String, required: true } // e.g., "Black"
        }
      ],
      price: { type: Number, required: true },
      discountPrice: { type: Number },
      stock: { type: Number, required: true },
      image: { type: String } // Image for this variant
    }
  ],

  // Product Variations
  variations: [
    {
      color: { type: String }, // For products with color variations
      size: { type: String }, // For clothes/footwear
      storage: { type: String }, // For electronics like mobiles
      ram: { type: String }, // For laptops/mobiles
      stock: { type: Number, required: true },
      images: [{ type: String }], // Images specific to this variation
      price: { type: Number, required: true }, // Price for this variation
      discountPrice: { type: Number }, // Discounted price for this variation
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
