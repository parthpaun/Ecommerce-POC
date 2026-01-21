const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    }, // Self-referencing
    attributes: [
      {
        name: { type: String, required: true }, // E.g., "RAM", "Storage", "Color"
        options: { type: [String], default: [] }, // E.g., ["8GB", "16GB"] for RAM
      },
    ],
    image: {
      name: { type: String, default: null },
      url: { type: String, default: null },
      key: { type: String, default: null }
    }, // Category icon/image (optional)
    description: { type: String, default: "" }, // Optional description
    isActive: { type: Boolean, default: true }, // Active/inactive status
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
