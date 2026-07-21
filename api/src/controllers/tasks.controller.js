
/** @type {*} */
const { getAllTasks } = require('../models/task.model');


/**
 * 
 * Get all tasks
 *
 * @param {*} req
 * @param {*} res
 */
const getAll = async (req, res) => {
	const tasks = getAllTasks();
	res.json(tasks);
};

module.exports = {
	getAll,
};