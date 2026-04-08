import api from "./api"
import { USE_MOCK } from "./config"

const delay = (ms) => new Promise(r => setTimeout(r, ms))

// mock
const mockLogin = async (credentials) => {
  await delay(500)
  const dummyToken = "dummy-jwt-token-12345"
  const dummyUser = {
    id: 1,
    name: "Test User",
    email: credentials.email || "test@example.com"
  }
  return { token: dummyToken, user: dummyUser }
}

const mockRegister = async (userData) => {
  await delay(500)
  return { message: "User registered successfully" }
}

// real
const realLogin = async (credentials) => {
  const response = await api.post("/auth/login", credentials)
  return response.data
}

const realRegister = async (userData) => {
  const response = await api.post("/auth/register", userData)
  return response.data
}

export const login = USE_MOCK ? mockLogin : realLogin
export const register = USE_MOCK ? mockRegister : realRegister

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export const isAuthenticated = () => {
  return !!localStorage.getItem("token")
}
