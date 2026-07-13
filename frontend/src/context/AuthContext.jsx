import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("bho_user");
    return saved ? JSON.parse(saved) : null;
  });

  const persist = (data) => {
    localStorage.setItem("bho_token", data.token);
    localStorage.setItem("bho_user", JSON.stringify(data));
    setUser(data);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    persist(data);
    return data;
  };

  const signup = async (name, email, phone, password) => {
    const { data } = await api.post("/auth/signup", { name, email, phone, password });
    persist(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("bho_token");
    localStorage.removeItem("bho_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
