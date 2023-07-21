import React, { useState } from "react";
import NavBar from "../Navbar/Navbar";
import "./Connexion.css"
export default function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
        
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Email non valide");
        } else if (email !== "" && password !== "") {
            setError("");
            // connexion au serveur
            // si tout les champs sont remplis et qu'il ya pas d'erreurs enregitre les data dans localstorage
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        }
    }

    return (
        <>
            <NavBar/>
        <div className="Connexion">
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
                {error && <p>{error}</p>}
                <button type="submit">Connexion</button>
            </form>
        </div>
        </>
    )
}

