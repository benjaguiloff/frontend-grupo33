import React from 'react';
import './App.css';
import axios from 'axios';
import LoginButton from './users/LoginButton';
import Profile from './users/Profile';
import BilleteraVirtual from './users/BilleteraVirtual';

/*
App
- Componente que contiene la página principal
- Se utiliza en la página principal
*/

axios.defaults.withCredentials = false;

function App() {
  return (
    <div className="container">
      <div id="root-content">
        <h1>¡Stocks!</h1>
        <Profile />
        <LoginButton />
        <BilleteraVirtual />
      </div>
    </div>
  );
}

export default App;
