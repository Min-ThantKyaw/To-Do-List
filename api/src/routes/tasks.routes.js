const express = require('express');
const router = express.Router();

const { getAll } = require('../controllers/tasks.controller');

router.get('/tasks', getAll);

module.exports = router;