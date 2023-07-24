import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../Navbar/Navbar";
import "./Connexion.css"
export default function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    } 
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Vérifier si l'email est valide 
        if (!validateEmail(email)) {
            // Si l'email n'est pas valide, définir l'erreur
            setError("Email non valide");
        } else if (email !== "" && password !== "") {
            // Si l'email et le mot de passe sont présents, réinitialiser l'erreur
            setError("");
            // Envoyer une requête POST avec l'email et le mot de passe
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            // Attendre la réponse du serveur et la convertir en JSON
            const data = await response.json();
            // Si l'utilisateur est présent dans la réponse, rediriger vers son profil
            if (data.user) {
                navigate(`/profil/${data.user.id}`);
            }
        }
    }



    return (
        <>
            <NavBar/>
        <div className="Connexion">
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
                <button type="submit">Connexion</button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </form>
        </div>
        </>
    )
}

