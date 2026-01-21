const Category = require("./../../models/category");

module.exports.getCategories = async (req, res) => {
  try {
    const { id } = req.query;
    const categories = await Category.find({ _id: { $ne: id } })
      .populate("parentCategory")
      .select("-__v");
    return res.status(200).json({
      data: categories,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong! ", error: err });
  }
};

module.exports.addCategory = async (req, res) => {
  try {
    const categoriesData = req.body.data;
    const { name, description, parentCategory, attributes, image } =
      categoriesData || {};
    const isCategoryAvailable = await Category.findOne({ name: name });
    if (isCategoryAvailable) {
      return res
        .status(500)
        .json({ message: "This category is already available" });
    }
    const categoryData = { name, description, attributes, image };
    if (parentCategory) {
      categoryData.parentCategory = parentCategory;
    }
    const category = new Category(categoryData);
    const newCategory = await category.save();
    const categoryObject = newCategory.toObject(); // Convert the document to a plain JavaScript object
    delete categoryObject.__v; // Remove the __v field
    const categories = await Category.find().select("-__v");
    res.status(200).json({ data: { categories, category: categoryObject } });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong! ", error: err });
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, parentCategory, attributes, image } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Cannot find category" });
    }

    if (!name) {
      return res.status(400).json({ message: "Required field is missing" });
    }

    category.name = name;
    category.description = description;
    category.attributes = attributes;
    category.image = image;
    category.parentCategory = parentCategory;
    category.updatedAt = Date.now();

    const updatedCategory = await category.save();

    return res.status(200).json({ data: updatedCategory });
  } catch (err) {
    console.error("err", err);
    return res.status(500).json({
      message: "Something went wrong!",
      error: err.message,
    });
  }
};

module.exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    const categories = await Category.find().select("-__v");

    return res
      .status(200)
      .json({ message: "category deleted successfully", data: { categories } });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error });
  }
};

module.exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id)
      .select("-__v")
      .populate("parentCategory", "__id name");

    res.status(200).json({ data: category });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error });
  }
};
