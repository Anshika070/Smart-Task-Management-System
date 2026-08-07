const cron = require("node-cron");
const Task = require("../models/Task");
const User = require("../models/User");
const { sendReminderEmail } = require("../services/emailService");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    console.log("Current Time:", now);

    const allTasks = await Task.find();

    console.log(`Total Tasks in DB: ${allTasks.length}`);

    allTasks.forEach((task) => {
      console.log({
        title: task.title,
        completed: task.completed,
        reminderSent: task.reminderSent,
        reminderTime: task.reminderTime,
        shouldSend:
          !task.completed &&
          !task.reminderSent &&
          task.reminderTime &&
          task.reminderTime <= now,
      });
    });

    const tasks = await Task.find({
      completed: false,
      reminderSent: false,
      reminderTime: { $lte: now },
    });

    console.log(`Matching Tasks: ${tasks.length}`);

    for (const task of tasks) {
      const user = await User.findById(task.user);

      if (!user) continue;

      console.log("================================");
      console.log("Current Time :", now);
      console.log("Created At   :", task.createdAt);
      console.log("Due DateTime :", task.dueDateTime);
      console.log("ReminderTime :", task.reminderTime);
      console.log("================================");

      await sendReminderEmail(user, task);

      task.reminderSent = true;
      await task.save();

      console.log(`✅ Reminder sent for "${task.title}"`);
    }
  } catch (err) {
    console.error(err);
  }
});
