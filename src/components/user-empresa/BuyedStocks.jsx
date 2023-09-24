/*
Se hace fetch a la API de las acciones compradas y solicitudes pendientes.

GET api/user/:id/stocks. 
*/
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuyedStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, isLoading } = useAuth0(); // Agregamos isLoading
  const userId = user?.sub; // Usamos user?.sub para obtener el ID de usuario

  useEffect(() => {
    if (isAuthenticated) {
      // Verificamos si el usuario está autenticado antes de hacer la solicitud
      console.log(user);
      axios
        .get(`/api/user/${userId}/stocks`)
        .then((response) => {
          setStocks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener las existencias:', error);
          setLoading(false);
        });
    }
  }, [isAuthenticated, userId]); // Agregamos isAuthenticated y userId como dependencias

  if (isLoading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras Auth0 verifica la autenticación
  }

  return (
    <div>
      {isAuthenticated ? (
        loading ? (
          <p>Cargando existencias...</p>
        ) : (
          <div>
            <h4> UserId: {userId} </h4>
            <h2>Acciones Compradas</h2>
            <ul>
              {stocks.map((stock) => (
                <li key={stock.id}>{stock.nombre}</li>
              ))}
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
