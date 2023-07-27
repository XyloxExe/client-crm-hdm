import React,{useEffect,useState} from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import AvatarUser from "../images/avatar7.png";
import avatarBorder from "../images/avatarBorder.png"
import { BiSolidDashboard } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';


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
                 <div className="userinfoNavbar">
                  <div className="borderImgUserNav">
                    <div className="borderAvataruser">
                    <img src={avatarBorder} alt="" srcset="" />
                  <img src={AvatarUser} className="AvatarUser" alt="" srcset="" />
                    </div>
                  </div>
                  <p>{userdata.firstName} {userdata.lastName}</p>
                 </div>
                 <div className="DashboardNavLink">

                 <li><BiSolidDashboard className="navbarIcon"/> <Link  to={`/profile/${userId}`}><i ></i>Dashboard</Link></li>
                 </div>
                 <li> <span><i className="fa fa-dashboard"></i></span><Link style={{color : "#fff"}} to={`/profile/${userId}`}><i className="fa fa-dashboard"></i>Mon Porfile</Link></li>
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
