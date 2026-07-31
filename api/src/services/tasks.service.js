const {
  findAll,
  findById,
  save,
  update,
  remove,
} = require("../models/task.model.js");
const { generateId } = require("../utils/helpers.js");

exports.getPendingTasks = async () => {
  const tasks = await findAll();
  if (tasks.length === 0) {
    return { success: true, message: "Not found tasks.", data: [] };
  }
  const pendingTasks = tasks.filter((task) => task.completed === false);
  if(pendingTasks.length === 0){
    return { success: true, message: "There are no pending tasks.", data: [] };
  }
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
    id: generateId(),
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

exports.updateTask = async (id, taskData) => {

  const existingTask = await findById(id);
  
  if (!existingTask) {
    return { success: false, message: "Task not found.", data: null };
  }

  const updatedTaskData = {
    ...existingTask,
    title: taskData.title !== undefined ? taskData.title : existingTask.title,
    date: taskData.date || existingTask.date || new Date().toISOString().split("T")[0],
    priority: taskData.priority || existingTask.priority || "medium",
    category: taskData.category || existingTask.category || "personal",
    completed: taskData.completed !== undefined ? taskData.completed : existingTask.completed,
    updatedAt: new Date().toISOString(),
  };

  const result = await update(id, updatedTaskData);

  return { success: true, message: "Task updated successfully.", data: result };
}

