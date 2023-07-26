import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AvatarUser from "../images/avatar7.png";
import "./Profile.css";
import NavBar from "../Navbar/Navbar";

export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `https://localhost:8000/api/user/${id}`;
        const response = await axios.get(url);
        setUserData(response.data);
        setEmail(response.data.mail);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = `https://localhost:8000/api/user/${id}`;
      const response = await axios.put(url, { mail: email });
      setUserData((prevData) => ({ ...prevData, mail: response.data.mail }));
      setIsEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données utilisateur :", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="Profile">
        <div className="Profile-header">
          <h2>Mon Profil</h2>
          <p>Aide</p>
        </div>

        <div className="Profile-main">
          <div className="Profile-image">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img src={AvatarUser} className="avatarUser" alt="image-profile" />
              <h3>{userData.lastName}</h3>
            </div>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
              method="post"
            >
              <div className="image-input">
                <input type="file" accept="image/*" id="imageInput" />
                <label htmlFor="imageInput" className="image-button">
                  <i className="far fa-image"></i> Changer de photo
                </label>
              </div>
            </form>
          </div>

          <form className="form-profile" onSubmit={handleProfileUpdate}>
            <input
              disabled={!isEditMode}
              type="text"
              name="prenom"
              value={userData.lastName}
              placeholder="Prénom"
            />
            <input
              disabled={!isEditMode}
              type="text"
              name="Nom"
              placeholder="Nom"
              value={userData.username}
            />
            <div className="profileEmailEdit">
              <input
                disabled={!isEditMode}
                type="email"
                name="mail"
                placeholder={userData.mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isEditMode && (
                <button className="profileEmailbuttonEdit" type="submit">
                  Sauvegarder
                </button>
              )}
            </div>
            <input
              disabled={!isEditMode}
              type="tel"
              name="numero"
              value={userData.telephone}
              placeholder="06********"
            />
            
          <div className="profileEditModeToggle">
            <button className="profileEditButton" onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? "Annuler" : "Modifier"}
            </button>
          </div>
          </form>

        </div>
      </div>
    </>
  );
}
