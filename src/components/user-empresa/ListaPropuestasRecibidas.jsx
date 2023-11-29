import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState,  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const proposalsURL = `${backendURL}/auctions/proposals`;

const ListaPropuestasRecibidas = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
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
          const response = await axios.get(proposalsURL);
          setProposals(response.data);
          setLoading(false);
          console.log("response de auctions/proposals", response);
        }
      } catch (error) {
        console.error('Error al obtener las ofertas:', error);
        setLoading(false);
      }
    };

    fetchData(); // Llama a la función asincrónica
  }, [isAuthenticated, userId, proposalsURL]);

  const containerStyle = {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
  };

  const handleAcceptClick = (proposal) => {
    if (roles[0] === 'admin') {
      respondProposal(proposal, 'acceptance');
      console.log("proposal", proposal);
    } else {
        setMessage('No tienes permisos para aceptar ofertas.');
    }
  }

  const handleRejectClick = (proposal) => {
    if (roles[0] === 'admin') {
        respondProposal(proposal, 'rejection');
    } else {
        setMessage('No tienes permisos para rechazar ofertas.');
    }
  }

  const respondProposal = async (proposal, resp) => {
    try {
        const accessToken = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.post(
        `${backendURL}/auctions/respond`,
        {
          auctionId: proposal.auctionId,
          proposalId: proposal.proposalId,
          symbol: proposal.stockId,
          quantity: proposal.quantity,
          response: resp,
        },
        { headers }
      );
      console.log(response);
      if (resp === 'acceptance') {
          setMessage('Oferta aceptada');
      } else {
          setMessage('Oferta rechazada');
      }
    } catch (error) {
      console.error('Error al intentar responder oferta:', error);
      setMessage('Error al responder oferta');
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
          <p>Cargando propuestas recibidas...</p>
        ) : (
          <div>
            <h2 style={{ textAlign: 'center' }}>Propuestas recibidas</h2>
            <p style={{ textAlign: 'center' }}>{message}</p>
            {proposals.length > 0 ? (
              proposals.map(([offer, offerProposals]) => (
                <div key={offer.auctionId}>
                  <h3>Oferta: {offer.stockId} - {offer.quantity} acciones</h3>
                  {offerProposals.length > 0 ? (
                    offerProposals.map((proposal) => (
                      <div style={containerStyle} key={proposal.proposalId}>
                        <div style={{ width: "70%", textAlign: "center" }} className="card">
                          Grupo {proposal.groupId}: {proposal.stockId} - {proposal.quantity} acciones
                        </div>
                        <button onClick={() => handleAcceptClick(proposal)} style={{ width: '100%' }}>
                          ACEPTAR PROPUESTA
                        </button>
                        <button onClick={() => handleRejectClick(proposal)} style={{ width: '100%' }}>
                          RECHAZAR PROPUESTA
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No hay propuestas para esta oferta.</p>
                  )}
                </div>
              ))
            ) : (
              <p>No hay ofertas disponibles aún.</p>
            )}
          </div>
        )
      ) : (
        <p>Por favor, inicia sesión para ver las ofertas recibidas.</p>
      )}
    </div>
  );
};

export default ListaPropuestasRecibidas;
