import React, { useState } from "react"
import { useAuth } from "../store/authStore"
import { updateUser } from "../services/userService"

const ProfilePage = () => {
  const { user, updateUserState } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)

    const payload = {}
    if (name) payload.name = name
    if (email) payload.email = email
    if (password) payload.password = password

    try {
      const updatedUser = await updateUser(payload)
      // update context with new data
      updateUserState({ ...user, ...payload, ...updatedUser })
      setMessage("Profile updated successfully")
      setPassword("")
    } catch (err) {
      setError(err.response?.data?.message || "Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="page-title">Profile</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">New Password</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
          />
        </div>
        <button className="form-submit-btn" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
        {message && <p className="msg-success">{message}</p>}
        {error && <p className="msg-error">{error}</p>}
      </form>
    </div>
  )
}

export default ProfilePage