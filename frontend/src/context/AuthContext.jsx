import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  getLocalAccessToken,
  getLocalAccessTokenName,
} from "../services/JwtService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check token on mount
  useEffect(() => {
    console.log("AuthProvider mounted, checking token...");
    const token = getLocalAccessToken();
    console.log("Retrieved token:", token);

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

    setAuthChecked(true);
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
  const token = getLocalAccessToken();

  return (
    <AuthContext.Provider value={{ user, login, token, logout, isLoggedIn, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};
