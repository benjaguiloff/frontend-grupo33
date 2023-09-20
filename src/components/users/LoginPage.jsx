import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useCookieAuth } from "../hooks/useCookieAuth";

axios.defaults.withCredentials = true;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [handleUserLogin] = useCookieAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Submitting login form with email ${email} and password ${password}`
    );
    verificarInicioSesion();
  };

  const verificarInicioSesion = async () => {
    const url = "http://localhost:4000/users/credentials"; // URL del endpoint en el backend

    const credenciales = {
      emailTest: email,
      contraseña: password,
    }; // Credenciales del usuario para la verificación del inicio de sesión

    try {
      const respuesta = await axios.post(url, credenciales);
      console.log(respuesta.data); // Imprimir la respuesta del servidor
      // const session = respuesta.data.session;

      if (!respuesta.data.error) {
        console.log("Inicio de sesión correcto");
        // handleUserLogin(session);
        navigate("/juego");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email" className="login-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
