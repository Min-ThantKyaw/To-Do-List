/** @type {*} */
const taskService = require("../services/tasks.service");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllPendingTasks();
    return res.success(tasks, "Get all tasks successfully.");
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await getTaskById(taskId);
    return res.success(task, `Get id ${taskId} successfully.`);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const formData = req.body;
    const newTask = await storeNewTask(formData);
    res.success(newTask, `Task was created successfully.`);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {};

exports.updateTask = async (req, res, next) => {};
