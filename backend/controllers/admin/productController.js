const Product = require("./../../models/product");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().select("-__v");
    return res.status(200).json({ data: products });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong! ", error: err });
  }
};
