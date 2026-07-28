const taskService = require("../services/tasks.service");

exports.getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getPendingTasks();
    return res.success(result.data, result.message);
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await taskService.getTaskById(id);
    if (!result.success) return res.status(404).json(result);
    return res.success(result.data, result.message);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const formData = req.body;
    const result = await taskService.createTask(formData);
    return res.success(result.data, result.message);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {success, message, data} = await taskService.deleteTask(id);
    if (!success) return res.status(404).json(data);
    return res.success(data, message);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    const {success, message, data} = await taskService.updateTask(id, formData);
    if (!success) return res.status(404).json(data);
    return res.success(data,message);
  } catch (error) {
    next(error);
  }
};
