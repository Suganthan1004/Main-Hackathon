import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import WelcomeBar from "../components/common/WelcomeBar";

const MainLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div >
      
      <Sidebar />

      <div>
        
        <WelcomeBar user={user} />

        
        <div >
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default MainLayout;