import api from "./api";

// POST /auth/register
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// POST /auth/login
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Logout (client-side only)
export const logout = () => {
  localStorage.removeItem("token");
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
