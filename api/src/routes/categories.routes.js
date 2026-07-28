const express = require("express");
const router = express.Router();

const { getCategories, getCategory } = require('../controllers/categories.controller');

router.get("/categories", getCategories)
router.get("/categories/:id", getCategory);
module.exports = router;