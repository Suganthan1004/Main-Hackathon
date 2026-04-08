import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/common/Sidebar"
import WelcomeBar from "../components/common/WelcomeBar"

const MainLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <WelcomeBar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout