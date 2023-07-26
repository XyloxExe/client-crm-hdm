import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AvatarUser from "../images/avatar7.png"
import "./Profile.css"
import NavBar from "../Navbar/Navbar";
export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [email,setEmail] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `https://localhost:8000/api/user/${id}`;
        const response = await axios.get(url);
        setUserData(response.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
        
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <>
    <NavBar />
      <div className="Profile">
      <div className="Profile-header">
        <h2>Mon Profile</h2>
        <p>Aide</p>
      </div>

    <div className="Profile-main">
      <div className="Profile-image">
        <div style={{display : "flex",flexDirection : "column"}}>
        <img src={AvatarUser} className="avatarUser" alt="image-profile" srcset="" />
        <h3>{userData.lastName}</h3>

        </div>
        <form style={{display : "flex",flexDirection : "column", gap : "30px"}}  method="post">
        <div class="image-input">
	<input type="file" accept="image/*" id="imageInput"/>
	<label for="imageInput" class="image-button"><i class="far fa-image"></i> Changer de photo</label>
</div>
        </form>
      </div>


    <form className="form-profile" method="post">
      <input disabled type="text" name="prenom" value={userData.lastName}  placeholder="prenom"  />
      <input disabled type="text" name="Nom" placeholder="Nom" value={userData.username}  />
      <div className="profileEmailEdit">
      <input type="email" name="mail" placeholder={userData.mail} value={email} onChange={(e) => setEmail(e.target.value) } />
      <button className="profileEmailbuttonEdit" type="submit">Modifier</button>
      </div>
      <input disabled type="tel" name="numero" value={userData.telephone} placeholder="06********" />
    </form>




    </div>

      </div>
    </>
  );
}
