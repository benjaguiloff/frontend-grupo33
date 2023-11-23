
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState,  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const ListaStocks = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0(); // Agregamos isLoading
  const userId = user?.sub; // Usamos user?.sub para obtener el ID de usuario

  if (isAuthenticated) {
    // Obtener el token de acceso de forma silenciosa
    getAccessTokenSilently().then((accessToken) => {
      // Ahora puedes usar el token de acceso en tus solicitudes API
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    });
  }

  let purchaseURL = `${backendURL}/purchases/admin`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(purchaseURL);
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

  const handleStockClick = (id) => { // Función para manejar el clic
    navigate('/');
  };

  const goBackToProfile = () => {
    navigate('/');
  }


  if (isLoading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras Auth0 verifica la autenticación
  }

  return (
    <div style={containerStyle}>
      <button onClick={goBackToProfile}>
        Volver
      </button>
      {isAuthenticated ? (
        loading ? (
          <p>Cargando stocks disponibles...</p>
        ) : (
          <div>
            <h2>Acciones Disponibles</h2>
              {Array.isArray(stocks) && stocks.length > 0 ? (
                stocks.map((stock) => (
                    // <h4 key={stock.id}>{stock.amount} acciones de {stock.shortName} ({stock.symbol}) - Estado: {stock.status}</h4>
                    <div 
                        key={stock.id}
                        style={{ width: "70%", textAlign: "center" }} 
                        className="card"
                        onClick={() => handleStockClick(stock.symbol)}  // Añade el manejador del clic aquí
                    >
                        {stock.shortName} ({stock.symbol}) - {stock.amount} acciones
                    </div>
                ))
              ) : (
                <p>No hay acciones disponibles aun.</p>
              )}
          </div>
        )
      ) : (
        <p>Por favor, inicia sesión para ver las acciones disponibles.</p>
      )}
    </div>
  );
};

export default ListaStocks;
