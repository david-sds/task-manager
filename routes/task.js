const router = require("express").Router();
const { Task } = require("../models/task");

router.post("/", async (req, res) => {
  const { description, done, deadline } = req.body;

  if (!description) {
    res.status(422).json({ error: "a description is required!" });
    return;
  }

  if (!deadline) {
    res.status(422).json({ error: "A deadline is required!" });
    return;
  }

  const task = {
    description,
    done,
    deadline,
  };
  try {
    await Task.create(task);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      res.status(422).json({ message: "Task not found!" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const taskId = req.params.id;
  const task = req.body;
  try {
    const updatedTask = await Task.updateOne({ _id: taskId }, task);
    if (updatedTask.matchedCount === 0) {
      res.status(422).json({ message: "Task not found!" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      res.status(422).json({ message: "Task not found!" });
      return;
    }
    await Task.deleteOne({ _id: taskId });
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

exports.router = router;
