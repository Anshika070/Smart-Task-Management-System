const Task = require("../models/Task");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { dueDate, time } = req.body;

    let dueDateTime = null;
    let reminderTime = null;

    if (dueDate && time) {
      const createdTime = new Date();

      // Build deadline in IST
      dueDateTime = new Date(`${dueDate}T${time}:00+05:30`);

      // Reminder 1 minute before deadline
      reminderTime = new Date(dueDateTime.getTime() - 1 * 60 * 1000);

      // If user creates a task less than 1 minute before deadline,
      // send reminder immediately.
      if (reminderTime < createdTime) {
        reminderTime = createdTime;
      }
    }

    const task = await Task.create({
      ...req.body,
      user: req.user._id,
      dueDateTime,
      reminderTime,
      reminderSent: false,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updates = { ...req.body };

    // First fetch the existing task
    const existingTask = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Use new values if provided, otherwise existing ones
    const dueDate = updates.dueDate || existingTask.dueDate;
    const time = updates.time || existingTask.time;

    if (dueDate && time) {
      const dueDateTime = new Date(
        `${new Date(dueDate).toISOString().slice(0, 10)}T${time}:00+05:30`
      );

      updates.dueDateTime = dueDateTime;

      updates.reminderTime = new Date(
        dueDateTime.getTime() - 60 * 1000
      );

      updates.reminderSent = false;
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(task);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
