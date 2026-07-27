const {
  findAll,
  findById,
  save,
  update,
  remove,
} = require("../models/task.model.js");
const { generateTaskId } = require("../utils/helpers.js");

exports.getPendingTasks = async () => {
  const tasks = await findAll();
  if (tasks.length === 0) {
    return { success: true, message: "No tasks found.", data: [] };
  }
  const pendingTasks = tasks.filter((task) => task.completed === false);
  return {
    success: true,
    message: "Pending tasks retrieved successfully.",
    data: pendingTasks,
  };
};

exports.getTaskById = async (id) => {
  const task = await findById(id);
  if (!task) {
    return { success: false, message: "Task not found.", data: null };
  }
  return { success: true, message: "Task retrieved successfully.", data: task };
};

exports.createTask = async (taskData) => {
  const tasks = await findAll();
  const newTask = {
    id: generateTaskId(),
    title: taskData.title,
    date: taskData.date || new Date().toISOString().split("T")[0],
    priority: taskData.priority || "medium",
    category: taskData.category || "personal",
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  await save(tasks);
  return { success: true, message: "Task created successfully.", data: newTask };
};

exports.deleteTask = async (id) => {
  const task = await findById(id);
  if (!task) {
    return { success: false, message: "Task not found.", data: null };
  }
  await remove(id);
  return { success: true, message: "Task deleted successfully.", data: null };
};
