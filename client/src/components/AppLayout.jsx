import React, { useState } from "react";
import {
  Check,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Moon,
  Plus,
  Sun,
  Tag,
  Menu,
} from "lucide-react";

import "./AppLayout.css";

export default function AppLayout({
  children,
  activePage,
  setActivePage,
  onAdd,
  user,
  onLogout,
  isDark,
  onToggleTheme,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    ["Dashboard", LayoutDashboard],
    ["My Tasks", ListTodo],
    ["Categories", Tag],
  ];

  return (
    <div className="shell">
      {/* Sidebar */}
      <aside className={sidebarOpen ? "open" : ""}>
        <div className="brand">
          <span>
            <Check size={17} />
          </span>
          taskflow
        </div>

        <nav>
          {links.map(([label, Icon]) => (
            <button
              key={label}
              className={activePage === label ? "active" : ""}
              onClick={() => {
                setActivePage(label);
                setSidebarOpen(false);
              }}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>

        <div className="account">
          <b>{user.name}</b>
          <small>{user.isGuest ? "Guest session" : user.email}</small>
        </div>

        <button className="theme-toggle" onClick={onToggleTheme}>
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
          {isDark ? "Light mode" : "Dark mode"}
        </button>

        <button
          className="settings"
          onClick={() => {
            setSidebarOpen(false);
            onLogout();
          }}
        >
          <LogOut size={19} />
          Log out
        </button>
      </aside>

      <main>
        <header>
          <div className="header-left">
            <button
              className="menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen && (
                <div
                  className="sidebar-overlay"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
              <Menu size={24} />
            </button>
            <h1>
              {activePage === "Dashboard"
                ? `Good morning, ${user.name.split(" ")[0]}!`
                : activePage}
            </h1>

            <p>
              {activePage === "Dashboard"
                ? "Here’s what’s on your plate today."
                : "Organize and make progress on what matters."}
            </p>
          </div>

          <button className="primary" onClick={onAdd}>
            <Plus size={18} />
            Add task
          </button>
        </header>

        {children}
      </main>
    </div>
  );
}
