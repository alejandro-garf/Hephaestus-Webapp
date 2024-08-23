'use client';

import React from "react";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = UserAuth();

  return (
    <div className="Dashboard-page">
      <h1>Dashboard</h1>
      {user && (
        <p>Welcome, {user.displayName}</p>
      )}
    </div>
  );
};

export default Dashboard;
