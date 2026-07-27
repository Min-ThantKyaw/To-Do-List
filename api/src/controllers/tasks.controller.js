const taskService = require("../services/tasks.service");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getPendingTasks();
    return res.success(tasks, "Get all tasks successfully.");
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(id);
    return res.success(task, `Get id ${id} successfully.`);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const formData = req.body;
    const newTask = await taskService.createTask(formData);
    res.success(newTask, "Task was created successfully.");
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {};

exports.updateTask = async (req, res, next) => {};
