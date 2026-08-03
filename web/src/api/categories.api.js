import { request } from "./client.js";

export async function getCategories() {
    const response = await request('categories');
    return response.data;
}

export async function getCategory(id) {
    const response = await request(`categories/${id}`);
    return response.data;
}

export async function createCategory(data) {
    const response = await request('categories', {
        method: 'POST',
        body: data,
    });
    return response.data;
}

export async function updateCategory(id, data) {
    const response = await request(`categories/${id}`, {
        method: 'PUT',
        body: data,
    });
    return response.data;
}

export async function deleteCategory(id) {
    const response = await request(`categories/${id}`, {
        method: 'DELETE',
    });
    return response.data;
}
