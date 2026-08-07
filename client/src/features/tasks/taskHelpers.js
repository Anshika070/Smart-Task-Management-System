export const seedTasks = [
  {
    id: "1",
    title: "Finalize project proposal",
    description: "Review the final draft and share with the team.",
    category: "Work",
    priority: "High",
    dueDate: "2026-08-07",
    time: "10:30",
    completed: false,
  },
  {
    id: "2",
    title: "Schedule team sync",
    description: "Prepare points for sprint planning.",
    category: "Work",
    priority: "Medium",
    dueDate: "2026-08-07",
    time: "14:00",
    completed: false,
  },
  {
    id: "3",
    title: "Buy groceries",
    description: "Vegetables, coffee and breakfast supplies.",
    category: "Personal",
    priority: "Low",
    dueDate: "2026-08-08",
    time: "",
    completed: false,
  },
  {
    id: "4",
    title: "Morning run",
    description: "30 minute easy run around the park.",
    category: "Health",
    priority: "Medium",
    dueDate: "2026-08-07",
    time: "07:00",
    completed: true,
  },
];
export const displayDueDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (isNaN(date.getTime())) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  if (+compareDate === +today) return "Today";

  if (+compareDate === +tomorrow) return "Tomorrow";

  return compareDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
export const localDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
