import api from "./api"
import { USE_MOCK } from "./config"

const delay = (ms) => new Promise(r => setTimeout(r, ms))

<<<<<<< HEAD
// POST /auth/login
// Returns { user, token } or similar
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
=======
// mock auth for frontend testing
const mockLogin = async (credentials) => {
  await delay(500)
  const dummyToken = "dummy-jwt-token-12345"
  const dummyUser = {
    id: 1,
    name: "Test User",
    email: credentials.email || "test@example.com"
  }
  localStorage.setItem("token", dummyToken)
  localStorage.setItem("user", JSON.stringify(dummyUser))
  return { token: dummyToken, user: dummyUser }
}

const mockRegister = async (userData) => {
  await delay(500)
  return { message: "Registration successful", user: userData }
}

// real backend calls
const realLogin = async (credentials) => {
  const response = await api.post("/auth/login", credentials)
  if (response.data.token) {
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("user", JSON.stringify(response.data.user || response.data))
  }
  return response.data
}

const realRegister = async (userData) => {
  const response = await api.post("/auth/register", userData)
  return response.data
}

// exported functions pick based on flag
export const login = USE_MOCK ? mockLogin : realLogin
export const register = USE_MOCK ? mockRegister : realRegister

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export const isAuthenticated = () => {
  return !!localStorage.getItem("token")
}
>>>>>>> 085968741fc0df5d0825938b78e3ef116d6f1212
