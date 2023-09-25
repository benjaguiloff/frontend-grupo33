/*
Ruta de Billetera Virtual:

URL: /usuario/:id/billetera
Componente: BilleteraVirtual.jsx
Descripción: Página que muestra el saldo actual de la 
billetera virtual de un usuario y permite recargarla.
*/

import React, { useEffect, useState } from 'react'; // Importa useEffect y useState
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

let backendURL = process.env.BACKEND_URL;

backendURL = 'http://localhost:8889';

const Wallet = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [walletAmount, setWalletAmount] = useState(0); // Crea un estado para almacenar el monto de la billetera

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          let walletURL = `${backendURL}/wallets/${user.sub}`;
          const response = await axios.get(walletURL);
          console.log('Response:', response.status);
          console.log('Response data:', response.data);
          setWalletAmount(response.data.money); // Establece el monto de la billetera con el valor recibido
          console.log('Wallet amount:', walletAmount);
        } catch (error) {
          console.error('Error al obtener los datos de la billetera:', error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, getAccessTokenSilently, user, walletAmount]);

  return (
    isAuthenticated && (
      <div className="profile">
        <div className="card">
          <h2 className="saldo">Wallet</h2>
          <p className="saldo">Saldo: ${walletAmount}</p>
        </div>
      </div>
    )
  );
};

export default Wallet;
