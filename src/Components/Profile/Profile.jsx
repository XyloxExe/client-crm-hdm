import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AvatarUser from "../images/avatar7.png";
import "./Profile.css";
import NavBar from "../Navbar/Navbar";

export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [lastName, setLastName] = useState("");
  const [firstname, setfirstname] = useState("");
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");



  const validatePhoneNumber = (inputPhoneNumber) => {
    const phoneNumberPattern = /^0[67]\d{8}$/; // French mobile number format (starts with 06 or 07, followed by 8 digits)
    if (!phoneNumberPattern.test(inputPhoneNumber)) {
      setPhoneNumberError("Le format du numéro de téléphone est incorrect.");
      return false;
    }
    setPhoneNumberError("");
    return true;
  };



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `https://localhost:8000/api/user/${id}`;
        const response = await axios.get(url);
        setUserData(response.data);
        setEmail(response.data.mail);
        setLastName(response.data.lastName);
        setUsername(response.data.username);
        setTelephone(response.data.telephone);
        setfirstname(response.data.firstName)
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const isPhoneNumberValid = validatePhoneNumber(telephone);
    if (!isPhoneNumberValid) {
      return; // If phone number format is invalid, don't proceed with updating the profile
    }
    try {
      const url = `https://localhost:8000/api/users/${id}`;
      const data = {
        username: username,
        mail: email,
        lastName: lastName,
        firstName : firstname,
        telephone: telephone
      };
      const response = await axios.put(url, data);
      setUserData((prevData) => ({ ...prevData, ...response.data }));
      setIsEditMode(false);
      setIsSuccess(true);
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
              <img src={userData.avatar || AvatarUser} className="avatarUser" alt="image-profile" />
              <br />
              <h3>{userData.lastName} { userData.firstName}</h3>
            </div>
            <div className="image-input">
              <input type="file" accept="image/*" id="imageInput" />
              <label htmlFor="imageInput" className="image-button">
                <i className="far fa-image"></i> Changer de photo
              </label>
            </div>
          </div>

          <form className="form-profile">
            
            
              <input
                disabled={!isEditMode}
                type="text"
                name="prenom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Prénom"
              />

<input
                disabled={!isEditMode}
                type="text"
                name="nom"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                placeholder="nom"
              />
            
            
         
              <input
                disabled={!isEditMode}
                type="text"
                name="Nom"
                placeholder="Nom"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
      
            <div className="profileEmailEdit">
              
               
                <input
                  disabled={!isEditMode}
                  type="email"
                  name="mail"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              
            
            </div>
            
             
              <input
                disabled={!isEditMode}
                type="tel"
                name="numero"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="06********"
                
              />
            {phoneNumberError && <p className="errorMessage">{phoneNumberError}</p>}

            
            <div className="profileEditModeToggle">
              <button
                className="profileEditButton"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditMode(!isEditMode);
                }}
              >
                {isEditMode ? "Annuler" : "Modifier"}
              </button>
              {isEditMode && (
                <button className="profileEmailbuttonEdit" onClick={handleProfileUpdate} type="button">
                  Sauvegarder
                </button>
              )}
                            {isSuccess && <p className="successMessage">Mise à jour du profil réussie!</p>}

            </div>
            
          </form>
        </div>
      </div>
    </>
  );
}
