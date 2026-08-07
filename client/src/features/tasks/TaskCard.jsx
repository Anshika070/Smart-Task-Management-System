import React from "react";
import {
  CalendarDays,
  Check,
  Circle,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { displayDueDate } from "./taskHelpers";
import "./TaskCard.css";
export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const time =
    task.time &&
    new Date(`1970-01-01T${task.time}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  return (
    <article className={`task-card ${task.completed ? "is-complete" : ""}`}>
      <button
        className={`check ${task.completed ? "completed" : ""}`}
        onClick={() => onToggle(task._id)}
      >
        {task.completed && <Check size={14} color="white" strokeWidth={3} />}
      </button>
      <div className="task-copy">
        <h3>{task.title}</h3>
        <p>
          <span className={`tag ${task.category.toLowerCase()}`}>
            {task.category}
          </span>
          <span>
            <CalendarDays size={13} />
            {displayDueDate(task.dueDate)}
            {time && `, ${time}`}
          </span>
        </p>
      </div>
      <span className={`priority ${task.priority.toLowerCase()}`}>
        {task.priority}
      </span>
      <button onClick={onEdit}>
        <MoreHorizontal size={20} />
      </button>
      <button className="danger" onClick={() => onDelete(task._id)}>
        <Trash2 size={17} />
      </button>
    </article>
  );
}
