const { get } = require('https');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'data', 'tasks.json');

const getAllTasks = () => {
	return dbPath;
};

module.exports = {
	getAllTasks
}