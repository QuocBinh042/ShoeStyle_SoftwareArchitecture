import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, logout } from "../services/authService";
import { jwtDecode } from "jwt-decode";

// Tạo context
const AuthContext = createContext();

// Provider bọc toàn bộ app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.userId,
          email: decoded.sub,
          roles: decoded.roles,
        });
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để lấy thông tin user
export const useAuth = () => useContext(AuthContext);
