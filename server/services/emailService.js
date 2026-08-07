const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function getRemainingTime(dueDateTime) {
  const now = new Date();
  const due = new Date(dueDateTime);

  const diff = due.getTime() - now.getTime();


  if (diff <= 0) {
    return {
      text: "Task deadline has passed",
      color: "#dc2626",
      emoji: "🔴",
      message: "This task has already crossed its deadline.",
    };
  }

  let remaining = diff;

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  remaining %= 1000 * 60 * 60 * 24;

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  remaining %= 1000 * 60 * 60;

  const minutes = Math.floor(remaining / (1000 * 60));

  const parts = [];

  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  if (!parts.length) {
    parts.push("less than a minute");
  }

  const totalHours = diff / (1000 * 60 * 60);

  let color = "#16a34a";
  let emoji = "🟢";
  let message = "You're making good progress. Keep it up!";

  if (totalHours <= 24) {
    color = "#f59e0b";
    emoji = "🟡";
    message =
      "Less than 24 hours remain. Consider completing this task today.";
  }

  if (totalHours <= 1) {
    color = "#dc2626";
    emoji = "🔴";
    message =
      "Less than 1 hour remaining. This task is about to reach its deadline.";
  }

  return {
    text: parts.join(" "),
    color,
    emoji,
    message,
  };
}

async function sendReminderEmail(user, task) {
  const remaining = getRemainingTime(task.dueDateTime);

  const html = `
  <div style="font-family:Arial,sans-serif;padding:30px;background:#f5f5f5;">

    <div style="
        max-width:650px;
        margin:auto;
        background:white;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 5px 15px rgba(0,0,0,.08);
    ">

      <div style="
          background:#7c3aed;
          color:white;
          padding:25px;
          text-align:center;
      ">
        <h1 style="margin:0;">⏰ Task Reminder</h1>
      </div>

      <div style="padding:30px;">

        <h2>Hello ${user.name}, 👋</h2>

        <p style="font-size:18px; line-height:1.7;">
           Your task
           <b style="color:#7c3aed;">"${task.title}"</b>
             is due in
         <b style="color:${remaining.color};">
            ${remaining.text}
         </b>.
        </p>

        <div style="
            background:${remaining.color};
            color:white;
            padding:20px;
            border-radius:10px;
            text-align:center;
            margin:25px 0;
        ">

            <h2 style="margin:0;">
              ${remaining.emoji} Time Remaining
            </h2>

            <h1 style="
                margin:15px 0 5px;
                font-size:34px;
            ">
                ${remaining.text}
            </h1>

            <p style="margin:0;font-size:15px;">
                ${remaining.message}
            </p>

        </div>

        <table
          style="
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          "
        >

          <tr>
            <td style="padding:12px;font-weight:bold;">Task</td>
            <td>${task.title}</td>
          </tr>

          <tr style="background:#fafafa;">
            <td style="padding:12px;font-weight:bold;">Description</td>
            <td>${task.description || "-"}</td>
          </tr>

          <tr>
            <td style="padding:12px;font-weight:bold;">Category</td>
            <td>${task.category}</td>
          </tr>

          <tr style="background:#fafafa;">
            <td style="padding:12px;font-weight:bold;">Priority</td>
            <td>${task.priority}</td>
          </tr>

          <tr>
            <td style="padding:12px;font-weight:bold;">Due Date</td>
            <td>${new Date(task.dueDateTime).toLocaleDateString()}</td>
          </tr>

          <tr style="background:#fafafa;">
            <td style="padding:12px;font-weight:bold;">Due Time</td>
            <td>${task.time}</td>
          </tr>

        </table>

        <div style="
            margin-top:35px;
            text-align:center;
        ">

            <p style="
                font-size:15px;
                color:#666;
            ">
                Stay focused and keep completing your goals 🚀
            </p>

        </div>

      </div>

      <div style="
          background:#f3f4f6;
          text-align:center;
          padding:18px;
          color:#666;
          font-size:13px;
      ">
          Taskflow • Smart Task Management System
      </div>

    </div>

  </div>
  `;

  await transporter.sendMail({
    from: `"Taskflow" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `⏰ Reminder: ${task.title}`,
    html,
  });

  console.log(`Reminder email sent to ${user.email}`);
}

module.exports = {
  sendReminderEmail,
};
