const Category = require("./../../models/category");

module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
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

module.exports.addCategories = async (req, res) => {
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
    const categoriesData = req.body.data;
    const { name, description } = categoriesData;
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({ message: "Can not find category" });
    }
    if (name) {
      category.name = name;
      category.description = description;
    } else {
      res.status(500).json({ message: "required field is missing" });
    }
    const newCategory = await category.save();
    res.status(200).json({ data: newCategory });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong! ", error: err });
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
