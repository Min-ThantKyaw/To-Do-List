const express = require('express');
const cors = require('cors');

//route files
const tasksRoutes = require('./src/routes/tasks.routes');
// const categoriesRoutes = require('./src/routes/categories.routes');

const app = express();

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON request bodies

// TODO: Mount your routes here
app.use('/api', tasksRoutes);
// app.use('/api/categories', categoriesRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

module.exports = app;
