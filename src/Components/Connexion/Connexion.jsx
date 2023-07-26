import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../Navbar/Navbar";
import "./Connexion.css";
import axios from "axios";

export default function Connexion() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  
  const getUserId = async (token) => {
    const url = "https://localhost:8000/api/user/me";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("UserInfo : ", response);

      const userId = response.data.id;
      console.log("User ID:", userId);
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.log("Error fetching user ID:", error);
    }
  };



  const handleSubmit = async (e) => { 
    e.preventDefault();
    setErrors("");
    setLoading(true);

    if (username !== "" && password !== "") {
      const data = { username: username, password: password };
      const url = "https://localhost:8000/api/login";

      try {
        console.log("Sending data to the server:", data);
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("Response from the server:", response);

        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          const token = response.data.token; 
          localStorage.setItem("authToken", token);
          getUserId(token); // Appeler la fonction pour récupérer l'ID de l'utilisateur après une connexion réussie
        } else {
          setErrors("Erreur lors de l'enregistrement des données");
          setLoading(false);
        }
      } catch (error) {
        console.log("Error:", error);
        setErrors("Erreur lors de l'enregistrement des données...");
        setLoading(false);
      }
    } else {
      setErrors("Veuillez saisir l'email et le mot de passe.");
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="Connexion">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Connexion en cours..." : "Connexion"}
          </button>
         
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </>
  );
}
