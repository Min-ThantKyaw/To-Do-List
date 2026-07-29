const express = require("express");
const router = express.Router();

const { getCategories, getCategory, createCategory, deleteCategory, updateCategory } = require('../controllers/categories.controller');

router.get("/categories", getCategories)
router.get("/categories/:id", getCategory);
router.post("/categories", createCategory);
router.delete("/categories/:id", deleteCategory);
router.put("/categories/:id", updateCategory);
module.exports = router;