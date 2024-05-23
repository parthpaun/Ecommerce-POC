const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/admin/categories");

router.get("/categories", categoryController.getCategories);
router.post("/category", categoryController.addCategories);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

module.exports = router;
