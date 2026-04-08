import React, { useState } from "react"
import { useAuth } from "../store/authStore"
import { updateUser } from "../services/userService"

const ProfilePage = () => {
  const { user, updateUserState } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [contact, setContact] = useState(user?.contact || "")
  const [address, setAddress] = useState(user?.address || "")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)

    const payload = { name, contact, address }

    try {
      await updateUser(payload)
      updateUserState(payload)
      setMessage("Profile updated successfully")
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
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={user?.email || ""} disabled
            style={{ background: "#f5f5f5", color: "#999" }} />
        </div>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className="form-input" type="text" value={name}
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Contact</label>
          <input className="form-input" type="tel" value={contact}
            onChange={(e) => setContact(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input className="form-input" type="text" value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your default delivery address" />
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