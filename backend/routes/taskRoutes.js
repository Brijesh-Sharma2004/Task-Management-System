const express = require("express");

const { createTask, getMyTasks } = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All task endpoints below require authentication
router.post("/", protect, createTask);
router.get("/", protect, getMyTasks);

module.exports = router;
