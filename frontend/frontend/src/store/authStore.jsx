import React, { createContext, useContext, useState, useEffect } from "react"
import { login as loginApi, register as registerApi } from "../services/authService"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// Helper to read from localStorage synchronously
const getInitialToken = () => {
  try {
    return localStorage.getItem("token") || null
  } catch {
    return null
  }
}

const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  // Initialize state directly from localStorage (synchronous — no flash of logged-out state)
  const [user, setUser] = useState(getInitialUser)
  const [token, setToken] = useState(getInitialToken)
  const [loading, setLoading] = useState(false)

  // Persist token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("token")
    }
  }, [token])

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  const loginUser = async (credentials) => {
    setLoading(true)
    const data = await loginApi(credentials)
    setToken(data.token)
    setUser(data.user)
    setLoading(false)
    return data
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
    setToken(null)
    setUser(null)
  }

  const updateUserState = (updatedUser) => {
    setUser(updatedUser)
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
