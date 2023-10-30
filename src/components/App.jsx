import React from 'react';
import './App.css';
import axios from 'axios';
import LoginButton from './users/LoginButton';
import Profile from './users/Profile';
import BilleteraVirtual from './users/BilleteraVirtual';
import { CompraProvider } from './compras/CompraContext';
import PurchaseCompleted from './compras/CompraCompletada';
import ConfirmPurchase from './compras/ConfirmarCompra';
import Boleta from './compras/Boleta';

axios.defaults.withCredentials = false;

function App() {
  return (
    <div className="container">
      <div id="root-content">
        <h1>¡Stocks!</h1>
        <Profile />
        <LoginButton />
        <BilleteraVirtual />
        <CompraProvider>
          <ConfirmPurchase />
          <PurchaseCompleted />
          <Boleta />
        </CompraProvider>
      </div>
    </div>
  );
}

export default App;
