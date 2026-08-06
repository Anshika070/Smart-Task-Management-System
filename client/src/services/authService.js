const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
async function request(path, options) {
  const response = await fetch(`${API_URL}/auth/${path}`, { headers: { 'Content-Type': 'application/json' }, ...options });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || 'Something went wrong.');
  return body;
}
export const authService = { login: credentials => request('login', { method: 'POST', body: JSON.stringify(credentials) }), register: details => request('register', { method: 'POST', body: JSON.stringify(details) }) };
