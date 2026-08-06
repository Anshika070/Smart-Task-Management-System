import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Circle,
  Clock3,
  Filter,
  Flame,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import "./styles.css";

const initialTasks = [
  {
    id: 1,
    title: "Finalize project proposal",
    description: "Review the final draft and share with the team.",
    category: "Work",
    priority: "High",
    due: "Today",
    dueDate: "2026-08-06",
    time: "10:30",
    completed: false,
    accent: "#9b7cfe",
  },
  {
    id: 2,
    title: "Schedule team sync",
    description: "Prepare points for sprint planning.",
    category: "Work",
    priority: "Medium",
    due: "Today",
    dueDate: "2026-08-06",
    time: "14:00",
    completed: false,
    accent: "#9b7cfe",
  },
  {
    id: 3,
    title: "Buy groceries",
    description: "Vegetables, coffee and breakfast supplies.",
    category: "Personal",
    priority: "Low",
    due: "Tomorrow",
    dueDate: "2026-08-07",
    time: "",
    completed: false,
    accent: "#f59e70",
  },
  {
    id: 4,
    title: "Morning run",
    description: "30 minute easy run around the park.",
    category: "Health",
    priority: "Medium",
    due: "Today",
    dueDate: "2026-08-06",
    time: "07:00",
    completed: true,
    accent: "#52c29b",
  },
  {
    id: 5,
    title: "Read Atomic Habits",
    description: "Finish chapter 4 and note key takeaways.",
    category: "Personal",
    priority: "Low",
    due: "Aug 9",
    dueDate: "2026-08-09",
    time: "",
    completed: false,
    accent: "#f59e70",
  },
];

const categoryStyles = { Work: "work", Personal: "personal", Health: "health" };
function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("smts-tasks")) || initialTasks,
  );
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(
    () => localStorage.setItem("smts-tasks", JSON.stringify(tasks)),
    [tasks],
  );
  useEffect(() => document.body.classList.toggle("dark", dark), [dark]);
  const openTasks = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);
  const today = tasks.filter((t) => t.due === "Today" && !t.completed);
  const filtered = tasks.filter(
    (t) =>
      (filter === "All" ||
        (filter === "Completed" ? t.completed : t.category === filter)) &&
      `${t.title} ${t.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  const toggle = (id) =>
    setTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  const remove = (id) => setTasks((ts) => ts.filter((t) => t.id !== id));
  const save = (data) => {
    setTasks((ts) =>
      editing
        ? ts.map((t) => (t.id === editing.id ? { ...t, ...data } : t))
        : [
            {
              ...data,
              id: Date.now(),
              completed: false,
              accent:
                data.category === "Work"
                  ? "#9b7cfe"
                  : data.category === "Health"
                    ? "#52c29b"
                    : "#f59e70",
            },
            ...ts,
          ],
    );
    setModal(null);
    setEditing(null);
  };
  const progress = tasks.length
    ? Math.round((completed.length / tasks.length) * 100)
    : 0;
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <Check size={18} />
          </span>
          <span>taskflow</span>
        </div>
        <nav>
          {[
            ["Dashboard", LayoutDashboard],
            ["My Tasks", ListTodo],
            ["Calendar", CalendarDays],
            ["Categories", Tag],
          ].map(([name, Icon]) => (
            <button
              className={activeNav === name ? "nav active" : "nav"}
              onClick={() => setActiveNav(name)}
              key={name}
            >
              <Icon size={19} />
              {name}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav" onClick={() => setDark(!dark)}>
            <Settings size={19} />
            {dark ? "Light mode" : "Settings"}
          </button>
          <button className="nav">
            <LogOut size={19} />
            Log out
          </button>
          <div className="profile">
            <div className="avatar">AJ</div>
            <div>
              <b>Alex Johnson</b>
              <small>alex@email.com</small>
            </div>
            <ChevronDown size={15} />
          </div>
        </div>
      </aside>
      <main>
        <header>
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>
          <div>
            <h1>
              {activeNav === "Dashboard" ? "Good morning, Alex! 👋" : activeNav}
            </h1>
            <p>
              {activeNav === "Dashboard"
                ? "Here’s what’s on your plate today."
                : "Organize and make progress on what matters."}
            </p>
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={19} />
              <i />
            </button>
            <button
              className="primary"
              onClick={() => {
                setEditing(null);
                setModal("task");
              }}
            >
              <Plus size={18} />
              Add task
            </button>
          </div>
        </header>
        <section className="stats">
          <Stat
            label="Tasks due today"
            value={today.length}
            icon={<CalendarDays />}
            color="purple"
            note="Stay focused!"
          />
          <Stat
            label="Completed tasks"
            value={completed.length}
            icon={<Check />}
            color="green"
            note={`${progress}% completion rate`}
          />
          <Stat
            label="Pending tasks"
            value={openTasks.length}
            icon={<Clock3 />}
            color="orange"
            note="Keep it going!"
          />
        </section>
        <section className="content-grid">
          <div className="task-panel">
            <div className="section-title">
              <div>
                <h2>
                  {activeNav === "Dashboard" ? "Today's tasks" : "Your tasks"}
                </h2>
                <p>{today.length} tasks remaining</p>
              </div>
              <button
                className="link-btn"
                onClick={() => setActiveNav("My Tasks")}
              >
                View all <span>→</span>
              </button>
            </div>
            <div className="task-list">
              {(activeNav === "Dashboard" ? today : filtered).map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  toggle={toggle}
                  edit={() => {
                    setEditing(task);
                    setModal("task");
                  }}
                  remove={remove}
                />
              )) || (
                <div className="empty">
                  No tasks here yet. Add one to get started.
                </div>
              )}
            </div>
            <button
              className="add-inline"
              onClick={() => {
                setEditing(null);
                setModal("task");
              }}
            >
              <Plus size={18} /> Add a task
            </button>
          </div>
          <div className="right-col">
            <div className="focus-card">
              <div className="focus-top">
                <div>
                  <span className="eyebrow">
                    <Sparkles size={14} /> AI FOCUS
                  </span>
                  <h3>Your day, simplified.</h3>
                </div>
                <span className="spark">
                  <Sparkles size={22} />
                </span>
              </div>
              <p>
                You have <b>{today.length} tasks</b> planned for today. Start
                with the project proposal to make meaningful progress.
              </p>
              <button onClick={() => setModal("ai")}>
                Get AI suggestions <span>→</span>
              </button>
            </div>
            <div className="progress-card">
              <div className="section-title">
                <div>
                  <h2>Weekly progress</h2>
                  <p>Aug 4 – Aug 10</p>
                </div>
                <MoreHorizontal size={21} />
              </div>
              <div className="chart">
                <div
                  className="donut"
                  style={{ "--progress": `${Math.max(progress, 8) * 3.6}deg` }}
                >
                  <div>
                    <strong>{progress}%</strong>
                    <small>completed</small>
                  </div>
                </div>
                <div className="legend">
                  <p>
                    <i className="dot purple-dot" />
                    Completed <b>{completed.length}</b>
                  </p>
                  <p>
                    <i className="dot grey-dot" />
                    Remaining <b>{openTasks.length}</b>
                  </p>
                </div>
              </div>
              <div className="week">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (d, i) => (
                    <div className={i === 3 ? "day selected" : "day"} key={d}>
                      <small>{d}</small>
                      <b>{4 + i}</b>
                      <span>{i === 3 ? 3 : i === 4 ? 1 : ""}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
        {activeNav !== "Dashboard" && (
          <section className="all-tasks">
            <div className="toolbar">
              <div className="search">
                <Search size={17} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tasks..."
                />
              </div>
              <button className="filter">
                <Filter size={16} />
                {filter}
                <ChevronDown size={14} />
              </button>
              <div className="filter-menu">
                {["All", "Work", "Personal", "Health", "Completed"].map((x) => (
                  <button onClick={() => setFilter(x)} key={x}>
                    {x}
                  </button>
                ))}
              </div>
            </div>
            {filtered.map((t) => (
              <Task
                task={t}
                key={t.id}
                toggle={toggle}
                edit={() => {
                  setEditing(t);
                  setModal("task");
                }}
                remove={remove}
              />
            ))}
          </section>
        )}
      </main>
      {modal === "task" && (
        <TaskModal
          task={editing}
          close={() => {
            setModal(null);
            setEditing(null);
          }}
          save={save}
        />
      )}{" "}
      {modal === "ai" && <AiModal tasks={today} close={() => setModal(null)} />}
    </div>
  );
}
function Stat({ label, value, icon, color, note }) {
  return (
    <div className="stat">
      <span className={`stat-icon ${color}`}>{icon}</span>
      <div>
        <p>{label}</p>
        <h2>{value}</h2>
        <small className={color}>
          {color === "green" ? "↗ " : ""}
          {note}
        </small>
      </div>
    </div>
  );
}
function Task({ task, toggle, edit, remove }) {
  return (
    <article className={`task ${task.completed ? "done" : ""}`}>
      <button className="check" onClick={() => toggle(task.id)}>
        {task.completed ? <Check size={14} /> : <Circle size={19} />}
      </button>
      <div className="task-main">
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span
            className={`pill ${categoryStyles[task.category] || "personal"}`}
          >
            {task.category}
          </span>
          <span className="due">
            <CalendarDays size={14} />
            {task.due}
            {task.time && `, ${task.time}`}
          </span>
        </div>
      </div>
      <span className={`priority ${task.priority.toLowerCase()}`}>
        {task.priority}
      </span>
      <button className="more" onClick={edit}>
        <MoreHorizontal size={20} />
      </button>
      <button className="delete" onClick={() => remove(task.id)}>
        <Trash2 size={17} />
      </button>
    </article>
  );
}
function TaskModal({ task, close, save }) {
  const [form, setForm] = useState(
    task || {
      title: "",
      description: "",
      category: "Work",
      priority: "Medium",
      due: "Today",
      dueDate: "2026-08-06",
      time: "",
    },
  );
  const field = (name) => (e) => setForm({ ...form, [name]: e.target.value });
  return (
    <div className="overlay">
      <form
        className="modal"
        onSubmit={(e) => {
          e.preventDefault();
          save(form);
        }}
      >
        <button type="button" className="close" onClick={close}>
          <X />
        </button>
        <span className="modal-icon">
          <ListTodo />
        </span>
        <h2>{task ? "Edit task" : "Create a new task"}</h2>
        <p>Give your work a clear home and a next step.</p>
        <label>
          Task name
          <input
            autoFocus
            required
            value={form.title}
            onChange={field("title")}
            placeholder="e.g. Prepare presentation"
          />
        </label>
        <label>
          Description
          <textarea
            value={form.description}
            onChange={field("description")}
            placeholder="What needs to be done?"
          />
        </label>
        <div className="form-row">
          <label>
            Category
            <select value={form.category} onChange={field("category")}>
              <option>Work</option>
              <option>Personal</option>
              <option>Health</option>
            </select>
          </label>
          <label>
            Priority
            <select value={form.priority} onChange={field("priority")}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            Due date
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  dueDate: e.target.value,
                  due:
                    e.target.value === "2026-08-06"
                      ? "Today"
                      : e.target.value === "2026-08-07"
                        ? "Tomorrow"
                        : new Date(e.target.value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          }),
                })
              }
            />
          </label>
          <label>
            Time
            <input type="time" value={form.time} onChange={field("time")} />
          </label>
        </div>
        <button className="primary full">
          {task ? "Save changes" : "Create task"}
        </button>
      </form>
    </div>
  );
}
function AiModal({ tasks, close }) {
  return (
    <div className="overlay">
      <div className="modal ai-modal">
        <button className="close" onClick={close}>
          <X />
        </button>
        <span className="modal-icon ai">
          <Sparkles />
        </span>
        <h2>Your smart plan</h2>
        <p>Based on your schedule, here’s a realistic way to move forward.</p>
        <div className="suggestion">
          <b>1. Start with deep work</b>
          <span>
            Block 60 minutes for “
            {tasks[0]?.title || "your most important task"}” before checking
            messages.
          </span>
        </div>
        <div className="suggestion">
          <b>2. Batch quick wins</b>
          <span>
            Group small admin tasks together after your focused work session.
          </span>
        </div>
        <div className="suggestion">
          <b>3. Protect your momentum</b>
          <span>
            You have {tasks.length} tasks today — completing 2 important ones is
            a successful day.
          </span>
        </div>
        <button className="primary full" onClick={close}>
          Sounds good
        </button>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
