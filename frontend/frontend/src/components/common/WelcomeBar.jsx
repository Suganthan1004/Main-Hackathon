import React from "react"
import { useAuth } from "../../store/authStore"

const WelcomeBar = () => {
  const { user, isLoggedIn } = useAuth()

  return (
    <div className="navbar">
      <div className="navbar-welcome">
        {isLoggedIn
          ? <>Welcome, <span>{user?.name || user?.email}</span></>
          : <span>Go Foodie</span>
        }
      </div>
    </div>
  )
}

export default WelcomeBar