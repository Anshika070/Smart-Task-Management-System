import React from "react";
import { BriefcaseBusiness, HeartPulse, UserRound } from "lucide-react";
import "./CategoryOverview.css";

const categoryConfig = [
  { name: "Work", icon: BriefcaseBusiness, tone: "work" },
  { name: "Personal", icon: UserRound, tone: "personal" },
  { name: "Health", icon: HeartPulse, tone: "health" },
];

export default function CategoryOverview({ tasks, onOpenCategory }) {
  return (
    <section className="categories-view">
      <div className="view-intro">
        <h2>Organize by category</h2>
        <p>See where your time and attention are going.</p>
      </div>
      <div className="category-grid">
        {categoryConfig.map(({ name, icon: Icon, tone }) => {
          const items = tasks.filter((task) => task.category === name);
          const completed = items.filter((task) => task.completed).length;
          const percentage = items.length
            ? (completed / items.length) * 100
            : 0;
          return (
            <article className={`category-card ${tone}`} key={name}>
              <span className="category-icon">
                <Icon size={22} />
              </span>
              <h3>{name}</h3>
              <p>
                {items.length} task{items.length === 1 ? "" : "s"} · {completed}{" "}
                completed
              </p>
              <div className="category-progress">
                <span style={{ width: `${percentage}%` }} />
              </div>
              <button onClick={() => onOpenCategory(name)}>View tasks →</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
