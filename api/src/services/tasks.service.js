const {
  findAll,
  findById,
  insert,
  update,
} = require("../models/task.model.js");

exports.getAllPendingTasks = async () => {
  const tasks = await findAll();
  console.log(tasks);
  if (tasks.length === 0) {
    throw new Error("There are no task data.");
  }
  const pendingTasks = tasks.filter((task) => task.completed === false);
  if (pendingTasks.length === 0) {
    return "There are no pending tasks.";
  }
  return pendingTasks;
};

exports.getAllCompleteTasks = exports.getTaskById = async (id) => {
  const task = await findById(id);
  if (task.length === 0) {
    throw new Error("Not found");
  }
  return task;
};

exports.storeNewTask = async (newTask) => {
  const tasks = await getAll();
  if (Array.isArray(tasks)) {
    tasks.push(newTask);
    await storeTask(tasks);
  }
  return tasks;
};
