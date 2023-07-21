import React from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";


export default function NavBar()
{
    return(
        <nav>
            <h1>navbar</h1>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/connexion">Connexion</Link></li>
                <li><Link to="/inscription">Inscription</Link></li>
            </ul>

        </nav>
    )
}