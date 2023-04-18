import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("https://social-app-be-bice.vercel.app/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data)
  };
  const logout = async() => {
    const res = await axios.post("https://social-app-be-bice.vercel.app/api/auth/logout")
    setCurrentUser(res.data)
    localStorage.setItem("user",setCurrentUser(null))
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};