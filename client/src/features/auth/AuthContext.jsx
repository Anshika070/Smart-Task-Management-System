import React, { createContext, useContext, useState } from "react";
import { authService } from "../../services/authService";
const AuthContext = createContext(null);
const SESSION_KEY = "taskflow-session";
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem(SESSION_KEY)),
  );
  const saveSession = (session) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    // Save JWT separately
    if (session.token) {
      localStorage.setItem("token", session.token);
    }

    setUser(session);
  };
  const login = async (credentials) =>
    saveSession(await authService.login(credentials));
  const register = async (details) =>
    saveSession(await authService.register(details));
  const continueAsGuest = () =>
    saveSession({
      id: "guest",
      name: "Guest user",
      email: "guest@taskflow.local",
      isGuest: true,
    });
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, continueAsGuest }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
