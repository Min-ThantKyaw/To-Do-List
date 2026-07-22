const { get } = require('https');
const path = require('path');
const fs = require('fs').promises;
const TASK_DATA = path.join(__dirname, '..', '..', 'data', 'tasks.json');

const findAll = async () => {
	const taskData = await fs.readFile(TASK_DATA, 'utf8');
	return JSON.parse(taskData);
}

const findById = async (id) => {
	const tasks = await findAll();
	return tasks.find(task => task.id === id);
}

module.exports = {
	findAll,
	findById
}