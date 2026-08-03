import {
    getCategories,
    createCategory,
    deleteCategory as deleteCategoryRequest,
} from '../api/categories.api.js';

const DEFAULT_COLOR = 'blue';

export async function loadCategories() {
    return getCategories();
}

export async function addCategory(name) {
    if (!name || !name.trim()) {
        throw new Error('Category name is required.');
    }
    return createCategory({ name: name.trim(), color: DEFAULT_COLOR, icon: '' });
}

export async function deleteCategory(id) {
    return deleteCategoryRequest(id);
}
