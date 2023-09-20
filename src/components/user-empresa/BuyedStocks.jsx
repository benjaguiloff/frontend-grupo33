/*
Se hace fetch a la API de las acciones compradas y solicitudes pendientes.

GET api/user/:id/stocks. 
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuyedStocks = ({ userId }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realiza la solicitud GET al servidor con el ID de usuario proporcionado.
    axios.get(`/api/user/${userId}/stocks`)
      .then(response => {
        // Al recibir la respuesta, actualiza el estado de las existencias y marca la carga como completa.
        setStocks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las existencias:', error);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div>
      <h2>Existencias del usuario:</h2>
      {loading ? (
        <p>Cargando existencias...</p>
      ) : (
        <ul>
          {stocks.map(stock => (
            <li key={stock.id}>
              Nombre: {stock.name}, Estado: {stock.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuyedStocks;
