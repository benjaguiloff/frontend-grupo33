/*
Se hace fetch a la API de las acciones compradas y solicitudes pendientes.

GET api/user/:id/stocks. 
*/
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const BuyedStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, isLoading } = useAuth0(); // Agregamos isLoading
  const userId = user?.sub; // Usamos user?.sub para obtener el ID de usuario

  let purchaseURL = `${backendURL}/purchases/${userId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(purchaseURL);
          console.log('Respuesta backend', response.status);
          console.log('Respuesta backend', response.data);
          setStocks(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener las existencias:', error);
        setLoading(false);
      }
    };

    fetchData(); // Llama a la función asincrónica
  }, [isAuthenticated, userId, purchaseURL]);

  const containerStyle = {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  if (isLoading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras Auth0 verifica la autenticación
  }

  return (
    <div style={containerStyle}>
      {isAuthenticated ? (
        loading ? (
          <p>Cargando existencias...</p>
        ) : (
          <div>
            <h2>Acciones Compradas</h2>
            <ul style={listStyle}>
              {Array.isArray(stocks) && stocks.length > 0 ? (
                stocks.map((stock) => <li key={stock.id}>{stock.nombre}</li>)
              ) : (
                <p>No tienes acciones compradas en este momento.</p>
              )}
            </ul>
          </div>
        )
      ) : (
        <p>Por favor, inicia sesión para ver tus acciones compradas.</p>
      )}
    </div>
  );
};

export default BuyedStocks;
