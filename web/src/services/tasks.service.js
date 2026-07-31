import { getTasks } from "../api/tasks.api.js";

export async function pendingTasks() {
    const tasks = await getTasks();
    return tasks;
}