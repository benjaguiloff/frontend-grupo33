
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState,  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const auctionsURL = `${backendURL}/auctions/offers`;
const purchaseURL = `${backendURL}/purchases/admin`;


const ListaAuctions = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [auctions, setAuctions] = useState([]);
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
          const response = await axios.get(auctionsURL);
          setAuctions(response.data);
          const response2 = await axios.get(purchaseURL);
          setStocks(response2.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener las ofertas:', error);
        setLoading(false);
      }
    };

    fetchData(); // Llama a la función asincrónica
  }, [isAuthenticated, userId, auctionsURL]);

  const containerStyleOuter = {
    margin: '20px',
    padding: '20px',
    border: '10px solid #ccc',
  };

  const containerStyle = {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
  };

  const goBackToProfile = () => {
    navigate('/');
  }

  const handleProposeClick = (auction, stock) => {
    if (roles[0] !== 'admin') {
      setMessage('No tienes permisos para proponer intercambios.');
    } else if (quantity > stock.quantity) {
      setMessage('No puedes proponer una cantidad mayor a la disponible.');
    }
    else {
      proposeOffer(auction, stock);
    }
  }

  const proposeOffer = async (auction, stock) => {
    if (!proposeOffer) {
      return
    }
    try {
      const accessToken = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.post(
        `${backendURL}/auctions/propose`,
        {
          auctionId: auction.auctionId,
          symbol: stock.symbol,
          quantity: quantity,
        },
        { headers }
      );
      console.log("stock", stock);
      console.log(response);
      setMessage('Propuesta enviada');
    } catch (error) {
      console.error('Error al enviar propuesta:', error);
      setMessage('Error al enviar propuesta');
    }
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
          <p>Cargando subastas...</p>
        ) : (
          <div>
            <h2 style={{ textAlign: 'center' }}>Subastas Disponibles</h2>
            <p style={{ textAlign: 'center' }}>{message}</p>
              {Array.isArray(auctions) && auctions.length > 0 ? (
                auctions.map((auction) => (
                    <div style={containerStyleOuter}>
                      <div 
                          key={auction.auctionId}
                          style={{ width: "70%", textAlign: "center" }} 
                          className="card"
                      >
                          Grupo {auction.groupId}: ({auction.stockId}) - {auction.quantity} acciones
                      </div>

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
                                <label htmlFor="quantity">Cantidad a intercambiar: </label>
                                <input 
                                  type="number" 
                                  id="quantity" 
                                  value={quantity} 
                                  onChange={e => setQuantity(e.target.value)} 
                                  min="1"
                                  max={stock.amount}
                                />
                              </div>

                              <button onClick={() => handleProposeClick(auction, stock)} style={{ width: '100%' }}>
                                PROPONER INTERCAMBIO 
                              </button>                          
                            </div>
                        ))
                      ) : (
                        <p style={{ textAlign: 'center' }}>No hay acciones disponibles aun.</p>
                      )}

                      
                    </div>
                ))
              ) : (
                <p style={{ textAlign: 'center' }}>No hay subastas disponibles aun.</p>
              )}
          </div>
        )
      ) : (
        <p>Por favor, inicia sesión para ver las subastas disponibles.</p>
      )}
    </div>
  );
};

export default ListaAuctions;
