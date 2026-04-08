import api from "./api";

// POST /auth/register
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// POST /auth/login
// Returns { user, token } or similar
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
