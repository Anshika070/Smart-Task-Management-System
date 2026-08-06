import React from 'react';
import { Check, LayoutDashboard, ListTodo, LogOut, Moon, Plus, Sun, Tag } from 'lucide-react';
import './AppLayout.css';
export default function AppLayout({ children, activePage, setActivePage, onAdd, user, onLogout, isDark, onToggleTheme }) {
  const links = [['Dashboard',LayoutDashboard],['My Tasks',ListTodo],['Categories',Tag]];
  return <div className="shell"><aside><div className="brand"><span><Check size={17}/></span>taskflow</div><nav>{links.map(([label, Icon]) => <button className={activePage === label ? 'active' : ''} onClick={() => setActivePage(label)} key={label}><Icon size={19}/>{label}</button>)}</nav><div className="account"><b>{user.name}</b><small>{user.isGuest ? 'Guest session' : user.email}</small></div><button className="theme-toggle" onClick={onToggleTheme}>{isDark ? <Sun size={19}/> : <Moon size={19}/>} {isDark ? 'Light mode' : 'Dark mode'}</button><button className="settings" onClick={onLogout}><LogOut size={19}/>Log out</button></aside><main><header><div><h1>{activePage === 'Dashboard' ? `Good morning, ${user.name.split(' ')[0]}!` : activePage}</h1><p>{activePage === 'Dashboard' ? 'Here’s what’s on your plate today.' : 'Organize and make progress on what matters.'}</p></div><button className="primary" onClick={onAdd}><Plus size={18}/>Add task</button></header>{children}</main></div>;
}
