// BilleteraVirtual.jsx

import React, { useEffect, useState } from 'react'; // Importa useEffect y useState
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import AddMoneyButton from './AddMoneyButton';
import { useNavigate } from 'react-router-dom';


// GET BACKEND_URL
const backendURL = process.env.REACT_APP_BACKEND_URL;


const Wallet = () => {
  const navigate = useNavigate(); // Usa el hook
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [walletAmount, setWalletAmount] = useState(0); // Crea un estado para almacenar el monto de la billetera

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          let walletURL = `${backendURL}/wallets/${user.sub}`;
          const response = await axios.get(walletURL);
          console.log(`${backendURL}/wallets/${user.sub}`);
          setWalletAmount(response.data.money); // Establece el monto de la billetera con el valor recibido
        } catch (error) {
          console.error('Error al obtener los datos de la billetera:', error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  const updateWallet = (amount) => {
    setWalletAmount(walletAmount + amount);
  };

  const goBackToProfile = () => {
    navigate('/');
  }
  return (
    isAuthenticated && (
      <div>
        <button onClick={goBackToProfile}>
        Volver
      </button>
        <div className="profile">
          <div className="card">
            <h2 className="saldo">Wallet</h2>
            <h2 className="saldo">{`$${walletAmount}`}</h2>{' '}
            {/* Muestra el monto de la billetera */}
            <AddMoneyButton updateWallet={updateWallet} />
          </div>
        </div>
      </div>
    )
  );
};

export default Wallet;
