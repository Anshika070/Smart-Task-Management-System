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
    console.log("Received dueDate:", dueDate);
    console.log("Received time:", time);
    console.log("Received body:", req.body);

    let dueDateTime = null;
    let reminderTime = null;

    if (dueDate && time) {
      const createdTime = new Date();

      // Build date manually to avoid timezone bugs
      const [year, month, day] = dueDate.split("-").map(Number);
      const [hours, minutes] = time.split(":").map(Number);

      dueDateTime = new Date(`${dueDate}T${time}:00+05:30`);
      console.log("Due Date Time:", dueDateTime);

      if (dueDateTime > createdTime) {
        const halfDuration =
          (dueDateTime.getTime() - createdTime.getTime()) / 2;

        reminderTime = new Date(createdTime.getTime() + halfDuration);
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

      const dueDateTime = new Date(updates.dueDate);

      const [hours, minutes] = updates.time.split(":").map(Number);

      dueDateTime.setHours(hours, minutes, 0, 0);

      updates.dueDateTime = dueDateTime;

      if (dueDateTime > createdTime) {
        const halfDuration =
          (dueDateTime.getTime() - createdTime.getTime()) / 2;

        updates.reminderTime = new Date(createdTime.getTime() + halfDuration);

        // Since the task has been rescheduled,
        // allow a reminder to be sent again.
        updates.reminderSent = false;
      } else {
        updates.reminderTime = null;
        updates.reminderSent = false;
      }
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
      },
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
