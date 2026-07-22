const express = require('express');
const router = express.Router();

const { getTasks, getTask } = require('../controllers/tasks.controller');

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);

module.exports = router;