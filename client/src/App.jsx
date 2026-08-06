import React, { useMemo, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import AppLayout from './components/AppLayout';
import Stats from './features/dashboard/Stats';
import AiPlanner from './features/ai/AiPlanner';
import CategoryOverview from './features/categories/CategoryOverview';
import TaskCard from './features/tasks/TaskCard';
import TaskFormModal from './features/tasks/TaskFormModal';
import { localDate } from './features/tasks/taskHelpers';
import { useTasks } from './features/tasks/useTasks';
import AuthScreen from './features/auth/AuthScreen';
import { useAuth } from './features/auth/AuthContext';

export default function App() {
  const { user, logout } = useAuth();
  const { tasks, save, toggle, remove } = useTasks();
  const [page, setPage] = useState('Dashboard');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(null);
  const [showAi, setShowAi] = useState(false);

  const todayTasks = tasks.filter(task => task.dueDate === localDate() && !task.completed);
  const completed = tasks.filter(task => task.completed).length;
  const visibleTasks = useMemo(() => tasks.filter(task => (
    filter === 'All' || (filter === 'Completed' ? task.completed : task.category === filter)
  ) && `${task.title} ${task.category}`.toLowerCase().includes(query.toLowerCase())), [tasks, filter, query]);
  const taskCards = page === 'Dashboard' ? todayTasks : visibleTasks;
  const openCategory = category => { setFilter(category); setPage('My Tasks'); };

  const tasksView = <><Stats today={todayTasks.length} completed={completed} pending={tasks.length - completed}/><section className="workspace"><div className="panel"><div className="panel-title"><div><h2>{page === 'Dashboard' ? "Today's tasks" : 'Your tasks'}</h2><p>{taskCards.length} task{taskCards.length === 1 ? '' : 's'} remaining</p></div>{page === 'Dashboard' && <button className="text-button" onClick={() => setPage('My Tasks')}>View all →</button>}</div>{page === 'My Tasks' && <div className="toolbar"><label><Search size={16}/><input placeholder="Search tasks..." value={query} onChange={event => setQuery(event.target.value)}/></label><select value={filter} onChange={event => setFilter(event.target.value)}><option>All</option><option>Work</option><option>Personal</option><option>Health</option><option>Completed</option></select></div>}<div className="tasks">{taskCards.map(task => <TaskCard key={task.id} task={task} onToggle={toggle} onEdit={() => setEditing(task)} onDelete={remove}/>)}{!taskCards.length && <p className="empty">Nothing here yet. Add a task to get started.</p>}</div><button className="add-link" onClick={() => setEditing({})}>+ Add a task</button></div><aside className="side-panel"><div className="focus"><span><Sparkles size={15}/> AI FOCUS</span><h2>Your day, simplified.</h2><p>You have <b>{todayTasks.length} tasks</b> planned for today. Start with the most important one to build momentum.</p><button onClick={() => setShowAi(true)}>Get AI suggestions →</button></div><div className="progress"><h2>Weekly progress</h2><p>This week</p><div className="progress-graphic"><div className="circle" style={{ '--p': `${tasks.length ? completed / tasks.length * 360 : 0}deg` }}><b>{tasks.length ? Math.round(completed / tasks.length * 100) : 0}%</b></div><div><p>Completed <b>{completed}</b></p><p>Remaining <b>{tasks.length - completed}</b></p></div></div></div></aside></section></>;

  if (!user) return <AuthScreen />;
  return <AppLayout activePage={page} setActivePage={setPage} onAdd={() => setEditing({})} user={user} onLogout={logout}>{page === 'Categories' ? <CategoryOverview tasks={tasks} onOpenCategory={openCategory}/> : tasksView}{editing && <TaskFormModal task={editing.id ? editing : null} onClose={() => setEditing(null)} onSave={save}/>} {showAi && <AiPlanner tasks={todayTasks} onClose={() => setShowAi(false)}/>}</AppLayout>;
}
