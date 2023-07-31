import React,{useEffect,useState} from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import AvatarUser from "../images/avatar8.jpg";
import avatarBorder from "../images/avatarBorder.png"
import { BiSolidDashboard } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';


import axios from "axios";
export default function NavBar() {

    const token = localStorage.getItem("authToken")
    const userId = localStorage.getItem("userId")
    const [userdata,setUserData] = useState([])
   

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const url = `https://localhost:8000/api/user/${userId}`;
          const response = await axios.get(url);
          setUserData(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur :", error);
        }
      };
  
      fetchUserData();
    }, [userId]);

  
    return(
      <>
      

     
        <div className="container">
                
                <ul  className={!token && !userId ? "sidebar" : "sidebarNormal "}>
                <li><span>HDMHUB</span></li>

                {
                !token && !userId ? (
                  <>
                  <li><span></span><Link style={{color : "#fff"}} to="/">Acceuil</Link></li>
                  <li><span></span><Link style={{color : "#fff"}} to="/connexion">connexion</Link></li>
                  <li><span></span><Link style={{color : "#fff"}} to="/inscription">inscription</Link></li>
                  </>
                  ) 
                 : 

                 <>
                 <div  className="userinfoNavbar">
                  <div  className="borderImgUserNav">
                    <div  className="borderAvataruser">
                    <img src={avatarBorder }  alt="" srcset="" />
                  <img src={userdata.photoFilename ?  `https://127.0.0.1:8000/public/uploads/${userdata.photoFilename}` : AvatarUser} className="AvatarUser" alt="" srcset="" />
                    </div>
                  </div>
                  <p>{userdata.firstName} {userdata.lastName}</p>
                 </div>
                  
                
                 
                 <div className="DashboardNavLink">
                 

                  <li> <Link  to={`/Dashboard/${userId}`}>Dashboard</Link></li>
                 </div>
                 <li> <span></span><Link style={{color : "#fff"}} to={`/profile/${userId}`}>Mon Porfile</Link></li>
                 <li><span></span><Link style={{color : "#fff"}} to="/logout">deconnexion</Link></li>
                 </>



                }
                 
                 
                </ul>
                
                <div className="content">
                   
                </div>
        </div>
        
      </>
      
      );
}
