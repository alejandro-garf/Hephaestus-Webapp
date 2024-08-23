'use client';

import React from "react";
import { UserAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = UserAuth();

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {user && (
        <p>Welcome, {user.displayName}</p>
      )}
    </div>
  );
};

export default Profile;
