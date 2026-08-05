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
        if (!category.success) return res.status(404).json(category);
        return res.success(category.data, category.message);
    }catch (error) {
        next(error);
    }
}

exports.createCategory = async (req, res, next) => {
    try {
        const newCategory = req.body;
        const result = await categoryService.createCategory(newCategory);
        if (!result.success) return res.status(400).json(result);
        return res.success(result.data, result.message);
    } catch (error) {
        next(error);
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const result = await categoryService.deleteCategory(categoryId);
        if (!result.success) return res.status(404).json(result);
        return res.success(result.data, result.message);
    } catch (error) {
        next(error);
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const formData = req.body;
        const result = await categoryService.updateCategory(id, formData);
        if (!result.success) return res.status(404).json(result);
        return res.success(result.data, result.message);

    } catch (error) {
        next(error);
    }
}
