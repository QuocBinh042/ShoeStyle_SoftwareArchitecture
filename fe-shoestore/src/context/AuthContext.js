import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, logout } from "../services/authService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
