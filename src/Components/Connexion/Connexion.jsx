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



  const handleSubmit = async (e) => { 
    e.preventDefault();
    // Reset error state and set loading to true during the request
    setErrors("");
    setLoading(true);

    if (username !== "" && password !== "") {
      const data = { username: username, password: password };
      const url = "https://localhost:8000/api/users";

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
          // Utilisation de response.data.id pour accéder à l'ID dans la réponse
          navigate(`/profil/${response.data.id}`);
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
      // Gérer le cas où l'email ou le mot de passe est vide
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
