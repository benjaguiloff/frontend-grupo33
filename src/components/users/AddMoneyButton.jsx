// AddMoneyButton.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const ADD_MONEY_URL = `${process.env.REACT_APP_BACKEND_URL}/wallets`;

const AddMoneyButton = ({ updateWallet }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [addAmount, setAddAmount] = useState(0);
  const [message, setMessage] = useState('');

  const addMoney = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.post(ADD_MONEY_URL, {
        userId: user.sub,
        money: addAmount,
      });
      updateWallet(addAmount);
      setMessage('¡Dinero agregado!');
    } catch (error) {
      console.error('Error al agregar dinero:', error);
      setMessage('Error al agregar dinero.');
    }
  };

  return (
    <div className="add-money">
      <input
        type="number"
        min="0"
        value={addAmount}
        style={{ width: '50%' }}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value >= 0) {
            setAddAmount(Number(e.target.value));
          }
        }}
      />
      <button
        onClick={addMoney}
        style={{
          width: '100%',
          'overflow-wrap': 'break-word',
          'word-break': 'break-word',
        }}
      >
        Agregar dinero
      </button>
      {message && (
        <div className="message">
          <p
            style={{
              width: '100%',
              'overflow-wrap': 'break-word',
              'word-break': 'break-word',
            }}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddMoneyButton;
