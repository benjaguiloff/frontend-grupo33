import React from 'react';
import './App.css';
import axios from 'axios';
import LoginButton from './users/LoginButton';
import Profile from './users/Profile';
import BilleteraVirtual from './users/BilleteraVirtual';

axios.defaults.withCredentials = true;

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
