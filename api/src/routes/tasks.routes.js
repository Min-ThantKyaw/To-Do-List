const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controller");

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);

module.exports = router;
