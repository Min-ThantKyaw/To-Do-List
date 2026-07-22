const { findAll, findById } = require('../models/task.model.js');

exports.getAllTasks = async () => {
	const tasks = await findAll();
	return tasks;
};

exports.getTaskById = async (id) => {
	const task = await findById(id);
	return task;
};
