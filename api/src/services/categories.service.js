const { findAll, findById, save, remove, update } = require('../models/category.model');
const { generateId } = require('../utils/helpers');

exports.getAllCategories = async () => {
    const categories = await findAll();
    if(!categories) throw new Error("There are no categories.");
    return {success: true, message: "Get categories successfully.", data: categories};
}

exports.getCategoryById = async (id) => {
    const category = await findById(id);
    if (!category) return { success: false, message: "Category not found.", data: null };
    return { success: true, message: "Get category successfully.", data: category };
}

exports.createCategory = async (newData) => {
    const categories = await findAll();
    if (!newData.name || !newData.name.trim()) {
        return { success: false, message: "Category name is required.", data: null };
    }
    const newCategory = {
        id: generateId(),
        name: newData.name.trim(),
        color: newData.color || "blue",
        icon: newData.icon || "",
        created_at: new Date().toISOString(),
    };
    categories.push(newCategory);
    await save(categories);
    return { success: true, message: "Category created successfully.", data: newCategory };
}

exports.deleteCategory = async(id) => {
    const category = await findById(id);
    if (!category) return { success: false, message: "Category not found.", data: null };
    await remove(id);
    return { success: true, message: "Category deleted successfully.", data: null };
}

exports.updateCategory = async (id, categoryData) => {
    const existingCat = await findById(id);
    if (!existingCat) return { success: false, message: "Category not found.", data: null };
    const newCategory = {
        ...existingCat,
        name: categoryData.name !== undefined ? categoryData.name.trim() : existingCat.name,
        color: categoryData.color !== undefined ? categoryData.color : existingCat.color,
        icon: categoryData.icon !== undefined ? categoryData.icon : existingCat.icon,
        updated_date: new Date().toISOString(),
    }

    const result = await update(id, newCategory);
    return {success: true, data: result, message: "Updated Successfully."}


}
