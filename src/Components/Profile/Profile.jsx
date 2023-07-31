import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AvatarUser from "../images/avatar8.jpg";
import "./Profile.css";
import NavBar from "../Navbar/Navbar";
import { LiaTrashAlt } from "react-icons/lia";


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
  const [profileImage, setProfileImage] = useState(null);



  const validatePhoneNumber = (inputPhoneNumber) => {
    const phoneNumberPattern = /^0[67]\d{8}$/; // French mobile number format (starts with 06 or 07, followed by 8 digits)
    if (!phoneNumberPattern.test(inputPhoneNumber)) {
      setPhoneNumberError("Le format du numéro de téléphone est incorrect.");
      return false;
    }
    setPhoneNumberError("");
    return true;
  };


  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setProfileImage(selectedFile);
  };
  
  



  const handlePhotoDelete = async (e) => {
    e.preventDefault()
    try {
      const deletePhotoUrl = `https://localhost:8000/api/users/${id}/remove_photo`;
      const response = await axios.post(deletePhotoUrl);
      if (response.status === 200) {
        setProfileImage(null);
        if (userData.photoFilename && userData.photoFilename !== "") {

          alert("votre votre a bien été supprimé")
        }
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la photo de profil :", error);
    }
  };
  

  







  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(profileImage);
        const url = `https://localhost:8000/api/user/${id}`;
        const response = await axios.get(url);
        setUserData(response.data);
        setEmail(response.data.mail);
        setLastName(response.data.lastName);
        setUsername(response.data.username);
        setTelephone(response.data.telephone);
        setfirstname(response.data.firstName)
        setProfileImage(response.data.photoFilename)
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
      return; 
    }
  
    try {
      const url = `https://localhost:8000/api/users/${id}`;
      const data = {
        username: username,
        mail: email,
        lastName: lastName,
        firstName: firstname,
        telephone: telephone,
      };
      const response = await axios.put(url, data);
      setUserData((prevData) => ({ ...prevData, ...response.data }));
      setIsEditMode(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données utilisateur :", error);
    }
  
    if (profileImage) {
      try {
        console.log(profileImage);
        const photoUploadUrl = `https://localhost:8000/api/users/${id}/update_photo`;
        const formData = new FormData();
        formData.append("photoFilename", profileImage);
  
        const photoResponse = await axios.post(photoUploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("Photo upload response:", photoResponse);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la photo de profil :", error);
      }
    }
    else {
      if (userData.photoFilename && userData.photoFilename !== "") {
        handlePhotoDelete();
      }
    }

  };
  

  return (
    <>
    <div className="Container">
      <NavBar />
      <div className="Profile">
        <div className="Profile-header">
          <h2>Mon Profil</h2>
          
        </div>

        <div className="Profile-main">
          <div className="Profile-image">
            <div style={{ display: "flex", flexDirection: "column" }}>
            <img
            src={profileImage ?  `https://127.0.0.1:8000/public/uploads/${userData.photoFilename}` : AvatarUser}
            className="avatarUser"
            alt="image-profile"
          />
              <br />
              <h3>{userData.lastName} { userData.firstName}</h3>
            </div>
            <form className="updateImage">
        <div className="image-input">
          <input type="file" id="imageInput" onChange={handleImageUpload} />
          <label htmlFor="imageInput" className="image-button">
            <i className="far fa-image"></i> Changer de photo
          </label>
          <button id="DeleteBtnPhotoProfile" onClick={handlePhotoDelete}>
            <LiaTrashAlt /> Supprimer
          </button>
        </div>
        
      </form>
    
          </div>

          <form className="form-profile">
  <div className="form-field">
    <label htmlFor="prenom">Prénom:</label>
    <input
      disabled={!isEditMode}
      type="text"
      name="prenom"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      placeholder="Prénom"
    />
  </div>

  <div className="form-field">
    <label htmlFor="nom">Nom:</label>
    <input
      disabled={!isEditMode}
      type="text"
      name="nom"
      value={firstname}
      onChange={(e) => setfirstname(e.target.value)}
      placeholder="Nom"
    />
  </div>

  <div className="form-field">
    <label htmlFor="Nom">Username:</label>
    <input
      disabled={!isEditMode}
      type="text"
      name="Nom"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  <div className="form-field">
    <label htmlFor="mail">Email:</label>
    <input
      disabled={!isEditMode}
      type="email"
      name="mail"
      placeholder="Enter your email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="form-field">
    <label htmlFor="numero">Numéro de téléphone:</label>
    <input
      disabled={!isEditMode}
      type="tel"
      name="numero"
      value={telephone}
      onChange={(e) => setTelephone(e.target.value)}
      placeholder="06********"
    />
    {phoneNumberError && <p className="errorMessage">{phoneNumberError}</p>}
  </div>

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
      </div>
    </>
  );
}