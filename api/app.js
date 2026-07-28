const express = require('express');
const cors = require('cors');
const responseHandler = require('./src/middleware/responseHandler');
const errorHandler = require('./src/middleware/globalErrorHandler');
//route files
const tasksRoutes = require('./src/routes/tasks.routes');
const categoriesRoutes = require('./src/routes/categories.routes');

const app = express();

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON request bodies
app.use(responseHandler); // Response handler middleware
app.use('/api', tasksRoutes);
app.use('/api', categoriesRoutes)

app.use(errorHandler); // Global error handler middleware
module.exports = app;
