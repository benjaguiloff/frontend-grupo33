import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const DetallePrediccion = () => {
  const navigate = useNavigate();
  const { predictionId, companyShortName, quantity, savingTime } = useParams();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [predictionResult, setPredictionResult] = useState(1);

  if (isAuthenticated) {
    getAccessTokenSilently().then((accessToken) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    });
  }
  
  useEffect(() => {
    const fetchPrediction = async () => {
        try {
          const response = await axios.get(`${backendURL}/predictions/${predictionId}`);
          setPredictionResult(response.data.result);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener la predicción:', error);
          setLoading(false);
        }
      };
      fetchPrediction();
    // Aquí puedes hacer algo con predictionId, como una solicitud a la API para obtener los detalles
  }, [predictionId]);

  const goBack = () => {
    navigate('/');
  }
  
  return (
    <div>
      <div className="bordered-section">
        <h3  style={{ textAlign: 'center' }}>Predicción de ganancia:</h3>
        <h2 style={{ textAlign: 'center', color: '#8cda80'}}> {predictionResult} USD</h2>
        <h4>Ahorrando {quantity} stocks de {companyShortName} durante {savingTime} días</h4>
      </div>

      <button onClick={goBack}>
        Volver al inicio
      </button>
    </div>
  );
};

export default DetallePrediccion;
