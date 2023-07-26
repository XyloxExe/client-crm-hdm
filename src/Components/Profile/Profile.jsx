
import React from "react";
import { useParams } from "react-router-dom"; 

export default function Profile() {
  let { id } = useParams();
  return (
    <div className="Profile">
      <h1>user profile id: {id}</h1>
    </div>
  );
}
