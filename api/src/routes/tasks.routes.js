const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  storeTaskAction,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controller");

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.delete("/tasks/delete", deleteTask);
router.put("/tasks/update", updateTask);

module.exports = router;
