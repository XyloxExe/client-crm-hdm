import React,{useEffect,useState} from 'react'
import './Dashboard.css'
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx"
import axios from "axios";
import Avatar from "../images/avatar6.png"
import AvatarUser from "../images/avatar8.jpg"
import Insta from "../images/Instagram Circle.png"
import Twitter from "../images/Twitter Circled.png"
import Linkdedin from "../images/LinkedIn Circled.png"
import { IoMdNotificationsOutline } from "react-icons/io";
import DashboardMain from "./Main/DashboardMain"

export default function Dashboard() {
    const { id } = useParams();
    const [userData, setUserData] = useState({});
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            console.log(profileImage);
            const url = `https://localhost:8000/api/user/${id}`;
            const response = await axios.get(url);
            setUserData(response.data);
            setUsername(response.data.username);
            setProfileImage(response.data.photoFilename)
          } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur :", error);
          }
        };
    
        fetchUserData();
      }, [id]);

  return (
    <div className="Container">
        <div>
            <Navbar/>
        </div>
        <div className="Dashboard">
           <div className='DashUserHeader'>
            <div className='DashUserHeaderInfo'>
                <div className='DashUserHeaderInfoName'>
                        <img  src={imagePreviewUrl ? imagePreviewUrl : (profileImage ? `https://127.0.0.1:8000/public/uploads/${userData.photoFilename}` : AvatarUser)} alt="UserProfile"  />
                        <p style={{fontSize : "26.772px"}}>Hello,  <span>&#128075;&#127996;</span>  </p>
                        <span>clients</span>
                        <h3 style={{fontSize : "43.049px"}}>{username} </h3>
                </div>
                <div className='DashUserHeaderSocial'>
                    <img src={Insta} alt="insta"  />
                    <img src={Twitter} alt="twitter"  />
                    <img src={Linkdedin} alt="Linkdedin"  />
                </div>
            </div>
            <div className='DashUserHeaderSetting'>
                <span><i class="fa-regular fa-bell fa-lg"></i></span>
                <span><i class="fa-solid fa-gear fa-lg"></i>  Help</span>
            </div>
           </div>
            <DashboardMain/>
        </div>
    </div>
)
}
