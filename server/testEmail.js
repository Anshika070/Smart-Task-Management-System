require("dotenv").config();

const { sendReminderEmail } = require("./services/emailService");

sendReminderEmail(
  {
    name: "Anshika",
    email: "kumarianshika0707@gmail.com",
  },
  {
    title: "Docker Project",
    description: "Finish Docker Deployment",
    category: "Work",
    priority: "High",
    dueDate: new Date(),
    time: "8:00 PM",
  }
)
.then(() => {
  console.log("Email Sent");
})
.catch(console.error);