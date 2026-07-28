const categoryService = require('../services/categories.service');

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        return res.success(categories.data, categories.message);
    } catch (error) {
        next(error);
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategoryById(categoryId);
        return res.success(category.data, category.message);
    }catch (error) {
        next(error);
    }
}