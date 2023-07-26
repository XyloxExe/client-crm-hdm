import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';

export default function NavBar() {

    const token = localStorage.getItem("authToken")
    const userId = localStorage.getItem("userId")
   

  
  return (
    <Menu>
      {!token && !userId ?  (
        <>
        <Link style={{color : "#fff"}} className="menu-item" to="/">Acceuil</Link>
        <Link   style={{color : "#fff"}} className="menu-item" to="/connexion">connexion</Link>
        <Link   style={{color : "#fff"}} className="menu-item" to="/inscription">inscription</Link>
        </>
        )
    : 
    
    <>
    <Link   style={{color : "#fff"}} className="menu-item" to={`/profile/${userId}`}>Mon Profile</Link>
    <Link   style={{color : "#fff"}} className="menu-item" to="/logout">déconnexion</Link>
    </>
    
    }
    </Menu>
  );
}
