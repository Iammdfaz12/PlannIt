require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB is not connected: ".err));

// Task Schema
const taskSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  progress: { type: String, default: "Not Started" },
  priority: { type: String, default: "High" },
  pinned: { type: Boolean, default: false },
  userId: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

// API Routes

// Get all tasks for a specific user
app.get("/tasks", async (req, res) => {
  const userId = req.query.userId; // Assuming you pass the userId as a query parameter
  const tasks = await Task.find({ userId });
  res.json(tasks);
});

// Add new task with userId
app.post("/tasks", async (req, res) => {
  try {
    const { category, title, description, progress, priority, pinned, userId } =
      req.body;
    const newTask = new Task({
      category,
      title,
      description,
      progress,
      priority,
      pinned,
      userId, // Ensure userId is included
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Edit task (ensure the task belongs to the user)
app.put("/tasks/:id", async (req, res) => {
  const { userId } = req.body;
  const task = await Task.findOne({ _id: req.params.id, userId });
  if (!task) return res.status(404).json({ message: "Task not found" });

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTask);
});

// Delete task (ensure the task belongs to the user)
app.delete("/tasks/:id", async (req, res) => {
  const { userId } = req.body;
  const task = await Task.findOne({ _id: req.params.id, userId });
  if (!task) return res.status(404).json({ message: "Task not found" });

  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// Toggle pin task (ensure the task belongs to the user)
app.put("/tasks/:id/pin", async (req, res) => {
  const { userId } = req.body;
  const task = await Task.findOne({ _id: req.params.id, userId });
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.pinned = !task.pinned; // Toggle pinned status
  await task.save();

  res.json(task);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
