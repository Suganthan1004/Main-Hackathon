import React, { createContext, useContext, useState, useEffect } from "react"
import { login as loginApi, register as registerApi } from "../services/authService"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)

  // hydrate from localstorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const loginUser = async (credentials) => {
    setLoading(true)
    try {
      const data = await loginApi(credentials)
      setToken(data.token)
      // backend returns { token, role } so we build user from what we have
      const userObj = { email: credentials.email, role: data.role }
      setUser(userObj)
      return data
    } finally {
      setLoading(false)
    }
  }

  const registerUser = async (userData) => {
    setLoading(true)
    try {
      const data = await registerApi(userData)
      return data
    } finally {
      setLoading(false)
    }
  }

  const logoutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  const updateUserState = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem("user", JSON.stringify(updated))
  }

  const isLoggedIn = !!token

  return (
    <AuthContext.Provider value={{
      user, token, loading, isLoggedIn,
      loginUser, registerUser, logoutUser, updateUserState
    }}>
      {children}
    </AuthContext.Provider>
  )
}
