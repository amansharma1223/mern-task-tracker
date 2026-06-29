const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Create Task
router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const ownerId = req.headers["x-user-id"];

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!ownerId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      ownerId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Tasks
router.get("/", async (req, res) => {
  try {
    const ownerId = req.headers["x-user-id"];

    if (!ownerId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const tasks = await Task.find({ ownerId }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Task
router.put("/:id", async (req, res) => {
  try {
    const ownerId = req.headers["x-user-id"];

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, ownerId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Task
router.delete("/:id", async (req, res) => {
  try {
    const ownerId = req.headers["x-user-id"];

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      ownerId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;