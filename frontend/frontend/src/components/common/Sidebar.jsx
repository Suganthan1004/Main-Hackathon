import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../store/authStore"

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, logoutUser } = useAuth()

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "/cart" },
    { name: "Orders", path: "/orders" },
    { name: "Profile", path: "/profile" },
  ]

  const handleLogout = () => {
    logoutUser()
    navigate("/login")
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">🍕 Go Foodie</div>

      {menuItems.map((item) => (
        <button
          key={item.name}
          className={`sidebar-btn ${location.pathname === item.path ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </button>
      ))}

      {isLoggedIn && (
        <button className="sidebar-btn-logout" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  )
}

export default Sidebar