import {
  createTask as createTaskRequest,
  deleteTask as deleteTaskRequest,
  getTasks,
  updateTask as updateTaskRequest,
} from '../api/tasks.api.js';
import { normalizeTaskInput, sortTasks, validateTask } from '../utils/helpers.js';

export async function loadTasks(sortBy = 'date') {
  const tasks = await getTasks();
  return sortTasks(tasks, sortBy);
}

export async function createTask(input) {
  const validation = validateTask(input);
  if (!validation.isValid) {
    const error = new Error('Task validation failed.');
    error.errors = validation.errors;
    throw error;
  }
  return createTaskRequest(normalizeTaskInput(input));
}

export async function updateTask(id, changes) {
  return updateTaskRequest(id, changes);
}

export async function toggleTaskComplete(task, completed = !task.completed) {
  return updateTask(task.id, { completed });
}

export async function deleteTask(id) {
  return deleteTaskRequest(id);
}

export function groupTasks(tasks) {
  return {
    pending: tasks.filter((task) => !task.completed),
    completed: tasks.filter((task) => task.completed),
  };
}
