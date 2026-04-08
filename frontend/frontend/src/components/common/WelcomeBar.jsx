import React from "react";

const WelcomeBar = ({ user }) => {
  return (
    <div>
      <h1>
        GO FOODIE
      </h1>

      <div>
        Welcome, {user?.name || "Guest"} 👋
      </div>
    </div>
  );
};

export default WelcomeBar;