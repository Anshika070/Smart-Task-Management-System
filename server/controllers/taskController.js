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

    // Recalculate reminder if due date or time changes
    if (updates.dueDate && updates.time) {
      const createdTime = new Date();

      // Build deadline in IST
      const dueDateTime = new Date(
        `${updates.dueDate}T${updates.time}:00+05:30`
      );

      updates.dueDateTime = dueDateTime;

      // Reminder 1 minute before deadline
      updates.reminderTime = new Date(
        dueDateTime.getTime() - 1 * 60 * 1000
      );

      // If less than 1 minute remains, remind immediately
      if (updates.reminderTime < createdTime) {
        updates.reminderTime = createdTime;
      }

      // Allow reminder to be sent again after editing
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

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
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
