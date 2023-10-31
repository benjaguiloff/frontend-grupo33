import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const backendURL = process.env.REACT_APP_BACKEND_URL;


const PredictionsList = () => {
  const navigate = useNavigate(); // Usa el hook
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  if (isAuthenticated) {
    getAccessTokenSilently().then((accessToken) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    });
  }

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(`${backendURL}/predictions/list_user/${user.sub}`);
        setPredictions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las predicciones:', error);
        setLoading(false);
      }
    };
    fetchPredictions();
  }, []);

  const handlePredictionClick = (predictionId, companyShortName) => { // Función para manejar el clic
    navigate(`/detallePrediccion/${predictionId}/${companyShortName}`);
  };

  const goBackToProfile = () => {
    navigate('/');
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <button onClick={goBackToProfile}>
        Volver
      </button>
      <h1 style={{ textAlign: "center" }}>Predicciones solicitadas</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {predictions.length > 0 ? (predictions.map((prediction, index) => (
          <div 
            key={index}
            style={{ width: "70%", textAlign: "center" }} 
            className="card"
            onClick={() => handlePredictionClick(prediction.job_id, prediction.symbol)}  // Añade el manejador del clic aquí
          >
            Predicción de {prediction.symbol} realizada en {prediction.datetime.split('T')[0]} ({prediction.datetime.split('T')[1].split('.')[0]})
          </div>
        ))) : (
            <p style={{ textAlign: "center" }}>No tienes solicitudes de predicciones en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default PredictionsList;
