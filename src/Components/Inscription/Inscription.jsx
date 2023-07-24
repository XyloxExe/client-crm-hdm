import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Navbar/Navbar";
import "./Inscription.css";
export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
 
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Email non valide");
    } else {
      setEmailError("");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
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
    if (email === "" || password === "" || name === "" || firstName === "" || lastName === "" || telephone === "") {
      setErrors("Tous les champs doivent être remplis");
    } else {
      const data = {
        username: name,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        telephone: telephone
      };
      let url = "https://127.0.0.1:8000/api/users";
      try {
        console.log("Sending data to the server:", data);
        const response = await axios.post(url, data);
        console.log("Response from the server:", response);
        if (response.status === 200) {
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
      <NavBar />
      <div className="Inscription">
        <h1 className="inscription-title">Inscription</h1>
        <form onSubmit={handleSubmit} className="inscription-form">
          <input
            placeholder="nom"
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
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
          <p style={{ color: "red", fontSize: "15px" }}>
            {" "}
            {errors.length > 0 && errors}{" "}
          </p>
        </form>
      </div>
    </>
  );
}

