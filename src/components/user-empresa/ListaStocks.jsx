
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState,  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const purchaseURL = `${backendURL}/purchases/admin`;

const ListaStocks = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0(); // Agregamos isLoading
  const userId = user?.sub; // Usamos user?.sub para obtener el ID de usuario
  let roles;
  if (user) {
    roles = user['https://arquisis-ifgg.me/roles'] || {roles: 'user'};
  }

  if (isAuthenticated) {
    // Obtener el token de acceso de forma silenciosa
    getAccessTokenSilently().then((accessToken) => {
      // Ahora puedes usar el token de acceso en tus solicitudes API
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(purchaseURL);
          setStocks(response.data);
          setLoading(false);
          console.log("response", response);
          console.log("stocks", stocks);
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


  const handleBuyClick = async (stock) => { 
    if (quantity > stock.amount) {
      setMessage('No se cuenta con la cantidad de stocks que quieres comprar.');
      return
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.post(
        `${backendURL}/purchases`,
        {
          symbol: stock.symbol,
          amount: quantity,
          userId: userId,
        },
        { headers }
      );
      console.log(response);
      setMessage('Compra realizada con exito');
    } catch (error) {
      console.error('Error al intentar comprar:', error);
      setMessage('Error al intentar comprar.');
    }
  };

  const handleAuctionClick = (stock) => { 
    if (roles[0] === 'admin') {
      AuctionStock(stock);
    } else {
      setMessage('No tienes permisos para subastar acciones.');
    }
  };

  const AuctionStock = async (stock) => {
    if (quantity > stock.amount) {
      setMessage('No se cuenta con la cantidad suficiente para subastar.');
      return
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.post(
        `${backendURL}/auctions/offer`,
        {
          symbol: stock.symbol,
          quantity: quantity, // Usando la cantidad seleccionada
        },
        { headers }
      );
      console.log(response);
      setMessage('Subasta realizada con éxito.');
    } catch (error) {
      console.error('Error al intentar subastar:', error);
      setMessage('Error al intentar subastar.');
    }
  }

  const goBackToProfile = () => {
    navigate('/');
  }


  if (isLoading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras Auth0 verifica la autenticación
  }

  return (
    <div>
      <button onClick={goBackToProfile}>
        Volver
      </button>
      {isAuthenticated ? (
        loading ? (
          <p>Cargando stocks disponibles...</p>
        ) : (
          <div>
            <h2 style={{ textAlign: 'center' }}>Acciones Disponibles</h2>
            <p style={{ textAlign: 'center' }}>{message}</p>
              {Array.isArray(stocks) && stocks.length > 0 ? (
                stocks.map((stock) => (
                    <div style={containerStyle}>
                      <div 
                          key={stock.id}
                          style={{ width: "70%", textAlign: "center" }} 
                          className="card"
                      >
                          {stock.shortName} ({stock.symbol}) - {stock.amount} acciones
                      </div>

                      <div style={{ textAlign: 'center', margin: '20px' }}>
                        <label htmlFor="quantity">Cantidad a comprar: </label>
                        <input 
                          type="number" 
                          id="quantity" 
                          value={quantity} 
                          onChange={e => setQuantity(e.target.value)} 
                          min="1"
                          max={stock.amount}
                        />
                      </div>

                      <button onClick={() => handleBuyClick(stock)} style={{ width: '100%' }}>
                        COMPRAR 
                      </button>
                      <button onClick={() => handleAuctionClick(stock)} style={{ width: '100%' }}>
                        SUBASTAR 
                      </button>
                      
                    </div>
                ))
              ) : (
                <p style={{ textAlign: 'center' }}>No hay acciones disponibles aun.</p>
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
