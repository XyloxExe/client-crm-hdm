import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';

export default function NavBar() {

    const token = localStorage.getItem("authToken")
    const userId = localStorage.getItem("userId")
   

  
    return(
      <>
        <div className="container">
                
                <ul className="sidebar">
                <li><span>HDMHUB</span></li>

                {
                !token && !userId ? (
                  <>
                  <li><span><i className="fa fa-dashboard"></i></span><Link style={{color : "#fff"}} to="/"><i className="fa fa-dashboard"></i>Acceuil</Link></li>
                  <li><span><i className="fa fa-dashboard"></i></span><Link style={{color : "#fff"}} to="/connexion"><i className="fa fa-dashboard"></i>connexion</Link></li>
                  <li><span><i className="fa fa-dashboard"></i></span><Link style={{color : "#fff"}} to="/inscription"><i className="fa fa-dashboard"></i>inscription</Link></li>
                  </>
                  ) 
                 : 

                 <>
                 <li><span><i className="fa fa-dashboard"></i></span><Link style={{color : "#fff"}} to={`/profile/${userId}`}><i className="fa fa-dashboard"></i>Mon Porfile</Link></li>
                 <li><span><i className="fa fa-dashboard"></i></span><Link style={{color : "#fff"}} to="/logout"><i className="fa fa-dashboard"></i>deconnexion</Link></li>
                 </>



                }
                 
                 
                </ul>
                
                <div className="content">
                   
                </div>
        </div>
      </>
      
      );
}
