import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../store/authStore"

const LoginPage = () => {
  const navigate = useNavigate()
  const { loginUser, loading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await loginUser({ email, password })
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="form-submit-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="msg-error">{error}</p>}
        </form>
      </div>
      <p className="auth-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}

export default LoginPage
