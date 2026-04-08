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
    const data = await registerApi(userData)
    setLoading(false)
    return data
  }

  const logoutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  const updateUserState = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
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
