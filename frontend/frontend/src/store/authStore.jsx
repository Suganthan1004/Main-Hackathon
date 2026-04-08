import React, { createContext, useContext, useState, useEffect } from "react"
import { login as loginApi, register as registerApi } from "../services/authService"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Save to localStorage whenever user or token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const loginUser = async (credentials) => {
    setLoading(true)
    try {
      const data = await loginApi(credentials)
      setToken(data.token)
      setUser(data.user)
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
    setToken(null)
    setUser(null)
  }

  const updateUserState = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }))
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

