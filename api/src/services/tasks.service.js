const {
  findAll,
  findById,
  save,
  update,
} = require("../models/task.model.js");
const { generateTaskId } = require("../utils/helpers.js");

exports.getPendingTasks = async () => {
  const tasks = await findAll();
  if (tasks.length === 0) {
    throw new Error("There are no task data.");
  }
  const pendingTasks = tasks.filter((task) => task.completed === false);
  if (pendingTasks.length === 0) {
    return [];
  }
  return pendingTasks;
};

exports.getTaskById = async (id) => {
  const task = await findById(id);
  if (!task) {
    throw new Error("Not found");
  }
  return task;
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
  return newTask;
};
