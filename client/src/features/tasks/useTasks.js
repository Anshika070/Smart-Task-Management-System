import { useEffect, useState } from "react";
import { taskService } from "../../services/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(task) {
    try {
      if (task._id) {
        const updated = await taskService.update(task._id, task);

        setTasks((items) =>
          items.map((item) => (item._id === updated._id ? updated : item)),
        );
      } else {
        const created = await taskService.create(task);

        setTasks((items) => [created, ...items]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function toggle(id) {
    const task = tasks.find((t) => t._id === id);
    

    const updated = await taskService.update(id, {
      completed: !task.completed,
    });

    setTasks((items) =>
      items.map((item) => (item._id === updated._id ? updated : item)),
    );
  }

  async function remove(id) {
    await taskService.remove(id);

    setTasks((items) => items.filter((item) => item._id !== id));
  }

  return {
    tasks,
    save,
    toggle,
    remove,
  };
}
