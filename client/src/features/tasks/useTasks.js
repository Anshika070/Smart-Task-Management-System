import { useEffect, useState } from 'react';
import { seedTasks } from './taskHelpers';
import { taskService } from '../../services/taskService';
const KEY = 'taskflow-tasks';
export function useTasks() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem(KEY)) || seedTasks);
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(tasks)), [tasks]);
  // The UI remains useful offline; switch to the API once its database is running.
  const save = task => setTasks(items => task.id ? items.map(item => item.id === task.id ? task : item) : [{ ...task, id: crypto.randomUUID(), completed: false }, ...items]);
  const toggle = id => setTasks(items => items.map(item => item.id === id ? {...item, completed: !item.completed} : item));
  const remove = id => setTasks(items => items.filter(item => item.id !== id));
  return { tasks, save, toggle, remove };
}
