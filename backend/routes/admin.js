const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/admin/categoryController");
const productsController = require("../controllers/admin/productController");

router.get("/categories", categoryController.getCategories);
router.post("/category", categoryController.addCategories);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

router.get("/products", productsController.getProducts);

module.exports = router;
