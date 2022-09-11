const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  description: String,
  done: Boolean,
  deadline: Date,
});

exports.Task = Task;
