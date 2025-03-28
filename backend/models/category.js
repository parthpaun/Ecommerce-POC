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
      },
    ],
    image: { type: String }, // Category icon/image URL (optional)
    description: { type: String }, // Optional description
    isActive: { type: Boolean, default: true }, // Active/inactive status
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
