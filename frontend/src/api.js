import axios from "axios";
import { generateMockJWT } from "./utils/jwtMock";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token (if exists) for every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- MOCK MODE for development ---
export const mockLogin = async (credentials) => {
  console.log("Mock login called with:", credentials);

  // Instead of real API, return a mock JWT
  const mockToken = generateMockJWT({
    username: credentials.username,
    email: credentials.username + "@example.com",
    role: "user",
  });

  // Store token in localStorage
  localStorage.setItem("authToken", mockToken);

  // Mock decoded username (until backend JWT is ready)
  const mockUser = { username: credentials.username || "dev_user" };

  return { token: mockToken, user: mockUser };
};

export const mockSignup = async (userData) => {
  console.log("Mock signup called with:", userData);

  // Simulate signup success with mock JWT
  const mockToken = "mock.jwt.token.for.signup";
  localStorage.setItem("authToken", mockToken);

  const mockUser = { username: userData.username || "new_dev_user" };

  return { token: mockToken, user: mockUser };
};

export default api;
