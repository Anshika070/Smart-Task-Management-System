const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;
function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const taskService = {
  async getAll() {
    const response = await fetch(API_URL, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return response.json();
  },

  async create(task) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    return response.json();
  },

  async update(id, changes) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(changes),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return response.json();
  },

  async remove(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  },
};