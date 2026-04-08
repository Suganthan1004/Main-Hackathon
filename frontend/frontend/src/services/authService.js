import api from "./api"
import { USE_MOCK } from "./config"

const delay = (ms) => new Promise(r => setTimeout(r, ms))

// mock
const mockLogin = async (credentials) => {
  await delay(500)
  const dummyToken = "dummy-jwt-token-12345"
  const role = "USER"
  localStorage.setItem("token", dummyToken)
  // backend only returns token+role, we store email from the form
  localStorage.setItem("user", JSON.stringify({
    email: credentials.email,
    role
  }))
  return { token: dummyToken, role }
}

const mockRegister = async (userData) => {
  await delay(500)
  return { message: "User registered successfully" }
}

// real
const realLogin = async (credentials) => {
  const response = await api.post("/auth/login", credentials)
  const { token, role } = response.data
  localStorage.setItem("token", token)
  localStorage.setItem("user", JSON.stringify({
    email: credentials.email,
    role
  }))
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
