import React, { useState, useEffect } from "react";
import { userService } from "../services/user.service";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getById(id);
      setUser(data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="user-info">
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
