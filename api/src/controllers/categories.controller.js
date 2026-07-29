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

exports.createCategory = async (req, res, next) => {
    try {
        const newCategory = req.body;
        const result = await categoryService.createCategory(newCategory);
        return res.success(result.data, result.message);
    } catch (error) {
        next(error);
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const result = await categoryService.deleteCategory(categoryId);
        return res.success(result.data, result.message);
    } catch {

    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        console.log(req.body)
        const formData = req.body;
        console.log(formData);
        const result = await categoryService.updateCategory(id, formData);
        return res.success(result.message, result.data);

    } catch (error) {
        next(error);
    }
}