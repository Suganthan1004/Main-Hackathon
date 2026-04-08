import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "/cart" },
    { name: "Orders", path: "/orders" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <div>
      <h2 >Food App</h2>

      {menuItems.map((item) => (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;