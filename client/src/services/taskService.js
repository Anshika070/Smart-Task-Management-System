const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';
export const taskService = {
  getAll: () => fetch(API_URL).then(r => r.ok ? r.json() : Promise.reject(r)),
  create: task => fetch(API_URL, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(task) }).then(r => r.json()),
  update: (id, changes) => fetch(`${API_URL}/${id}`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify(changes) }).then(r => r.json()),
  remove: id => fetch(`${API_URL}/${id}`, { method: 'DELETE' })
};
