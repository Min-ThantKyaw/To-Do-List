import { request } from "./client.js";

export async function getTasks() {
    const response = await request('tasks');
    return response.data;
}

export async function getTaskById(id) {
    const response = await request(`tasks/${id}`);
    return response.data;
}

export async function createTask(data) {
    const response = await request('tasks', {
        method: 'POST',
        body: data,
    });
    return response.data;
}

export async function updateTask(id, data) {
    const response = await request(`tasks/${id}`, {
        method: 'PUT',
        body: data,
    });
    return response.data;
}

export async function deleteTask(id) {
    const response = await request(`tasks/${id}`, {
        method: 'DELETE',
    });
    return response.data;
}
