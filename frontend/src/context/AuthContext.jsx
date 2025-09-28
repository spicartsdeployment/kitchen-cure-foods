import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  getLocalAccessToken,
  getLocalAccessTokenName,
} from "../services/JwtService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check token on mount
  useEffect(() => {
    const token = getLocalAccessToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            id: decoded.sub,
            role: decoded.role,
            name: decoded.name,
            email: decoded.email,
          });
        } else {
          logout();
        }
      } catch (err) {
        logout();
      }
    }
  }, []);

  const login = (userData, accessToken) => {
    localStorage.setItem(getLocalAccessTokenName(), accessToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(getLocalAccessTokenName());
    setUser(null);
  };

  const isLoggedIn = !!user;
  const token = getLocalAccessToken()

  return (
    <AuthContext.Provider value={{ user, login, token, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
