import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `https://localhost:8000/api/user/${id}`;
        const response = await axios.get(url);
        setUserData(response.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
        
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div className="Profile">
      {userData ? (
        <React.Fragment>
          <h1>User Profile ID: {id}</h1>
          <h3>User Role : {userData.roles}</h3>
          {/* Render the user data */}
          <p>Name: {userData.username}</p>
          <p>firstName: {userData.firstName}</p>
          <p>Email: {userData.mail}</p>
          <p>telephone: {userData.telephone}</p>
          {/* Add more user data fields as needed */}
        </React.Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
