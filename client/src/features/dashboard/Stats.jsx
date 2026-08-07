import React from "react";
import { CalendarDays, Check, Clock3 } from "lucide-react";
const icons = { today: CalendarDays, complete: Check, pending: Clock3 };
export default function Stats({ today, completed, pending }) {
  return (
    <section className="stats">
      {[
        {
          label: "Tasks due today",
          value: today,
          kind: "today",
          note: "Stay focused!",
        },
        {
          label: "Completed tasks",
          value: completed,
          kind: "complete",
          note: "Great progress!",
        },
        {
          label: "Pending tasks",
          value: pending,
          kind: "pending",
          note: "Keep it going!",
        },
      ].map((stat) => {
        const Icon = icons[stat.kind];
        return (
          <div className="stat" key={stat.kind}>
            <span className={stat.kind}>
              <Icon size={20} />
            </span>
            <div>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
              <small>{stat.note}</small>
            </div>
          </div>
        );
      })}
    </section>
  );
}
