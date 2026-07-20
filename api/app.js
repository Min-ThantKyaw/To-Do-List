const http = require('http');
const { getAllTasks } = require('./src/task')
const server = http.createServer(async (req, res) => {
	const { url, method, headers } = req;

	if (url === '/' && method === 'GET') {
		try {
			const tasks = await getAllTasks();
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(tasks));
		} catch {
			res.writeHead(500, { 'Content-Type': 'application/json' });
			res.end('Error fetching tasks');
		}
	}
	else if(url === 'api/tasks' && method === 'GET') {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end('Not Found');
	}
});

const PORT = 3000;
server.listen(PORT, 'localhost', () => {
	
	console.log(`Server running at http://localhost:${PORT}/`);

})