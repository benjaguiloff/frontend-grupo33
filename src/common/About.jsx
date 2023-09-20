import React from "react";
import "./About.css";

/*
About
- Componente que contiene la información de los creadores del juego
- Se utiliza en la página de About
*/

function About() {
  return (
    <div className="about">
      <div className="container">
        <h2>Acerca de nosotros</h2>
        <div className="container-about">
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </div>
    </div>
  );
}

export default About;
