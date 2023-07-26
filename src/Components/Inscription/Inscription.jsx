import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
import NavBar from "../Navbar/Navbar";
import Logo from "../images/logo.png"
import Avatar1 from "../images/avatar1.png"
import Avatar2 from "../images/avatar2png"
import Avatar3 from "../images/avatar3.png"
import Avatar4 from "../images/avatar4.png"
import Avatar5 from "../images/avatar5.png"
import Avatar6 from "../images/avatar6.png"
import "./Inscription.css";
export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };


  
  useEffect(() => {
    const isAuth = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (isAuth && userId) {
      navigate(`/profile/${userId}`);
    }
  }, [navigate]);


 
      
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Email non valide");
    } else {
      setEmailError("");
    }
  };

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleTelephoneChange = (e) => {
    setTelephone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || username === "" || firstName === "" || lastName === "" || telephone === "") {
      setErrors("Tous les champs doivent être remplis");
    } else {
      const data = {
        username: username,
        mail: email,
        password: password,
        firstName: firstName,
        lastName: lastName, 
        telephone: telephone
      };
      let url = "https://localhost:8000/api/users";
      try {
        console.log("Sending data to the server:", data);
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });        console.log("Response from the server:", response);
        if (response.status === 200 ||response.status === 201) {
          navigate("/connexion");
        } else {
          setErrors("Erreur lors de l'enregistrement des données");
        }
      } catch (error) {
        console.log("Error:", error);
        setErrors("Erreur lors de l'enregistrement des données ..");
      }
    }
  };

  return (
    <>
      <div className="Inscription">
        <div className="inscription-title">
          <img className="Logo" src={Logo} alt={Logo} srcset="" />
          <img className="avatar1" src={Avatar1} alt={Avatar1} srcset="" />
          <img className="avatar2" src={Avatar2} alt={Avatar2} srcset="" />
          <img className="avatar3" src={Avatar3} alt={Avatar3} srcset="" />
          <img className="avatar4" src={Avatar4} alt={Avatar4} srcset="" />
          <img className="avatar5" src={Avatar5} alt={Avatar5} srcset="" />
          <img className="avatar6" src={Avatar6} alt={Avatar6} srcset="" />
        </div>
        <form onSubmit={handleSubmit} className="inscription-form">
          <div className="Inscription-header">
          <h2 className="">Créer Un compte</h2>

          <p> ou connectez-vous directement <Link to="/connexion">ici</Link></p>
          <p style={{ color: "red", fontSize: "15px" }}>
            {" "}
            {errors.length > 0 && errors}{" "}
          </p>
          </div>
          <input
            placeholder="username"
            type="text"
            name="name"
            value={username}
            onChange={handleUserNameChange}
            className="inscription-input"
          />

          <input
            placeholder="prénom"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className="inscription-input"
          />

          <input
            placeholder="nom de famille"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className="inscription-input"
          />

          <input
            placeholder="téléphone"
            type="text"
            name="telephone"
            value={telephone}
            onChange={handleTelephoneChange}
            className="inscription-input"
          />

          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="inscription-input"
          />
          {emailError && <p className="email-error">{emailError}</p>}

          <input
            placeholder="********"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="inscription-input"
          />

          <input
            type="submit"
            value="cree mon compte"
            className="inscription-submit"
          />
        
        </form>
      </div>
    </>
  );
}

