import React from "react";
import "./App.css";
import axios from "axios";

/*
App
- Componente que contiene la página principal
- Se utiliza en la página principal
*/

axios.defaults.withCredentials = true;


function App() {


  
  return (
    <div className="container">
      <div id="root-content">
        <h1>¡Stocks!</h1>
        <button>Play</button>
      </div>
    </div>
  );
}

export default App;
