const { findAll, findById, save, remove, update } = require('../models/category.model');
const { generateId } = require('../utils/helpers');

exports.getAllCategories = async () => {
    const categories = await findAll();
    if(!categories) throw new Error("There are no categories.");
    return {success: true, message: "Get categories successfully.", data: categories};
}

exports.getCategoryById = async (id) => {
    const category = await findById(id);
    return { success: true, message: "Get category successfully.", data: category };
}

exports.createCategory = async (newData) => {
    const categories = await findAll();
    const newCategory = {
        id: generateId(),
        name: newData.name,
        color: newData.color,
        icon: newData.icon,
        created_at: new Date().toISOString(),
    };
    categories.push(newCategory);
    await save(categories);
    return { success: true, message: "Task created successfully.", data: newCategory };
}

exports.deleteCategory = async(id) => {
    const category = await findById(id);
    await remove(id);
    return { success: true, message: "Task deleted successfully.", data: null };
}

exports.updateCategory = async (id, categoryData) => {
    const existingCat = await findById(id);
    console.log(existingCat)
    const newCategory = {
        ...existingCat,
        name: categoryData.name !== undefined ? categoryData.name : existingCat.name,
        color: categoryData.color !== undefined ? categoryData.color : existingCat.color,
        icon: categoryData.icon !== undefined ? categoryData.icon : existingCat.icon,
        updated_date: new Date().toISOString(),
    }

    const result = await update(id, newCategory);
    return {success: true, data: result, message: "Updated Successfully."}


}