const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status } = req.body;

    // Validate the title
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    if (title.trim().length > 100) {
      return res.status(400).json({
        message: "Task title cannot exceed 100 characters",
      });
    }

    // Create the task in MongoDB
    const task = await Task.create({
      title: title.trim(),
      description,
      priority,
      status,
      owner: req.user.userId,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

// Get tasks belonging to the logged-in user
const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      owner: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getMyTasks,
};
