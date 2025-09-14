// src/pages/member/Profile.jsx
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-500">First Name</p>
          <p className="font-medium">{currentUser?.firstname}</p>
        </div>
        <div>
          <p className="text-gray-500">Last Name</p>
          <p className="font-medium">{currentUser?.lastname}</p>
        </div>
        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium">{currentUser?.email}</p>
        </div>
        <div>
          <p className="text-gray-500">Mobile</p>
          <p className="font-medium">{currentUser?.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
