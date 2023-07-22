import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import "./Inscription.css";
export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

