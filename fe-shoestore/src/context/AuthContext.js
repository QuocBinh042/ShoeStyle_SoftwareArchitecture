import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, logout } from "../services/authService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadUser = async () => {
    try {
      const token = await getToken();
      if (token) {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.userId,
          email: decoded.sub,
          roles: decoded.roles,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading user", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
