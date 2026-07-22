
/** @type {*} */
const { getAllTasks, getTaskById } = require('../services/tasks.service');


/**
 * 
 * Get all tasks
 *
 * @param {*} req
 * @param {*} res
 */
exports.getTasks = async (req, res) => {
	try {
		const tasks = await getAllTasks();
		return res.success(tasks, 'Get all tasks successfully.');
	} catch (err) {
		return res.error(err.message, 500);
	}
};

exports.getTask = async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await getTaskById(taskId);
		if (!task) {
			return res.error(`Task with id ${taskId} not found.`, 404);
		}
		return res.success(task, `Get id ${taskId} successfully.`);
	} catch (err) {
		return res.error(err.message, 500);
	}
};

const createTask = async (req, res) => {

};

const updateTask = async (req, res) => {

};

const deleteTask = async (req, res) => {

};
