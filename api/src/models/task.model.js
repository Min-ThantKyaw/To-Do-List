const path = require("path");
const fs = require("fs").promises;
const TASK_DATA = path.join(__dirname, "..", "..", "data", "tasks.json");

async function readData() {
  const data = await fs.readFile(TASK_DATA, "utf8");
  return data ? JSON.parse(data) : null;
}

async function writeData(data) {
  return await fs.writeFile(TASK_DATA, JSON.stringify(data, null, 2));
}

exports.findAll = async () => {
  const tasks = await readData();
  return tasks ? tasks : [];
};

exports.findById = async (id) => {
  const tasks = await readData();
  return tasks ? tasks.find((task) => task && task.id === id) : null;
};

exports.save = async (tasks) => {
  return await writeData(tasks);
};

exports.update = async (id, updateTask) => {
  const tasks = await readData();
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) throw new Error("Task not found.");
  tasks[taskIndex] = { ...tasks[taskIndex], ...updateTask };
  return await writeData(tasks);
};
