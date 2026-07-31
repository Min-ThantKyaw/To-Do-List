import { request } from "./client.js";

export async function getTasks() {
    const url = 'tasks';
    const response = await request(url);
    return response.data;
}