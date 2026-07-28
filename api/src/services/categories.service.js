const { findAll, findById } = require('../models/category.model');
const { generateId } = require('../utils/helpers');

exports.getAllCategories = async () => {
    const categories = await findAll();
    console.log(categories)
    if(!categories) throw new Error("There are no categories.");
    return {success: true, message: "Get categories successfully.", data: categories};
}

exports.getCategoryById = async (id) => {
    const category = await findById(id);
    return { success: true, message: "Get category successfully.", data: category };
}