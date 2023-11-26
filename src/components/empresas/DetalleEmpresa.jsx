
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const backendURL = process.env.REACT_APP_BACKEND_URL;
const purchaseURL = `${backendURL}/purchases`;
const CancelToken = axios.CancelToken;
let cancel;

const DetalleEmpresa = ({ itemsPerPage }) => {
  const navigate = useNavigate(); // 
  const { user, getAccessTokenSilently } = useAuth0();
  let roles;
  if (user) {
    roles = user['https://arquisis-ifgg.me/roles'] || {roles: 'user'};
  }
  const [companieArray, setCompanieArray] = useState([]);
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const page = searchParams.get('page') || 1;
  const size = searchParams.get('size') || 5;

  const [message, setMessage] = useState('');
  const [predictionMessage, setPredictionMessage] = useState('');
  const [currentCompany, setCurrentCompany] = useState(null);
  const [quantity, setQuantity] = useState(1); // Nuevo estado para la cantidad
  const [savingTime, setSavingTime] = useState(1); // Nuevo estado para el tiempo de ahorro
  const [predictionSuccess, setPredictionSuccess] = useState(false);
  const [predictionId, setPredictionId] = useState('');


  const [buyStocks, setBuyStocks] = useState(true);
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);


  useEffect(() => {
    if (companieArray.length > 0) {
      setCurrentCompany(companieArray[0]);
    }
  }, [companieArray]);

  const handleClick = () => {
    if (roles[0] === 'admin') {
    buyStock();
    } else {
      setMessage('No tienes permisos para comprar acciones.');
    }
  };

  const buyStock = async () => {
    if (!buyStocks) {
      return
    }
    try {
      setBuyStocks(false);
      const accessToken = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.post(
        purchaseURL,
        {
          userId: user.sub,
          symbol: id,
          amount: quantity, // Usando la cantidad seleccionada
          shortName: currentCompany ? currentCompany.shortName : '', // Usando el nombre corto de currentCompany
        },
        { headers }
      );
      console.log(response);
      const data = {
        nombreStock: currentCompany ? currentCompany.shortName : '',
        symbol: id,
        cantidad: quantity, // Usando la cantidad seleccionada
        precioTotal: currentCompany ? currentCompany.price * quantity : 0, // Usando el precio de currentCompany
      };
      navigate('/confirmarcompra?data=' + JSON.stringify(data));
    } catch (error) {
      console.error('Error al intentar comprar:', error);
      if (error.request.response.message === "No se cuenta con el dinero suficiente para comprar esta acción") {
        setMessage('No se cuenta con el dinero suficiente para comprar esta acción');
      } else {
        setMessage('Error al intentar comprar.');
      }
    }
  };

  useEffect(() => {
    if (companieArray.length ===  0) {
    const GetStocks = async () => {
      const url = `${backendURL}/stocks/${id}/?size=${500}`;
      try {
        if (cancel) {
          cancel('Request canceled');
        }
        const respuesta = await axios.get(url, {
          cancelToken: new CancelToken(function executor(c) {
            // Set a reference to the cancel function
            cancel = c;
          }),});
        setCompanieArray(respuesta.data);
        console.log(respuesta.data);
      } catch (error) {
        // console.error('Error al obtener las existencias:', error);
      }
    };
    GetStocks();
    };
  }, [id, page, size]);

  const startInterval = () => {
    setIsIntervalRunning(true);
  };

  const [currentPage, setCurrentPage] = useState(1); // Nueva variable de estado para la página actual

  const totalPages = Math.ceil(companieArray.length / size);

  // Calcula qué elementos mostrar en la página actual
  const currentItems = companieArray.slice(
    (currentPage - 1) * size,
    currentPage * size
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goBackToCOmpanies = () => {
    navigate('/companies');
  }

  const requestPrediction = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${accessToken}` };
      const predictionURL = `${backendURL}/predictions/create`; // Asume que tienes un endpoint de predicción
      const response = await axios.post(
        predictionURL,
        {
          userId: user.sub,
          symbol: id,
          amount: quantity,
          time_period: savingTime, // Usando el tiempo de ahorro
        },
        { headers }
      );
      // Maneja la respuesta aquí
      console.log(response);
      setPredictionMessage('Predicción solicitada correctamente.')
      setPredictionSuccess(true);
      setPredictionId(response.data.job_id);
    } catch (error) {
      console.error('Error al solicitar la predicción:', error);
      setPredictionMessage('Error al solicitar la predicción:', error);
    }
  };
  

  return (
    <div>
      <button onClick={goBackToCOmpanies}>
        Volver
      </button>
      <h1 style={{ textAlign: 'center' }}>Detalle Historico</h1>
      <h3 style={{ textAlign: 'center' }}>{id}</h3>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <label htmlFor="quantity">Cantidad a comprar: </label>
        <input 
          type="number" 
          id="quantity" 
          value={quantity} 
          onChange={e => setQuantity(e.target.value)} 
          min="1"
        />
      </div>
      {currentItems.map((stock, index) => (
        <h4 style={{ textAlign: 'center' }} key={index}>
          
          {stock.datetime.split('T')[0]} ({stock.datetime.split('T')[1].split('.')[0]}): 
          {stock.price} {stock.currency}
        </h4>
      ))}
      <p style={{ textAlign: 'center', marginTop: '50px'}}>
        Página {currentPage} de {totalPages}
      </p>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Anterior
      </button>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Siguiente
      </button>
      <button onClick={handleClick} style={{ width: '100%' }}>
        COMPRAR 
      </button>
      <p style={{ textAlign: 'center' }}>{message}</p>

    
      <div className="bordered-section">
        <h2>PREDICCIÓN</h2>
        <label htmlFor="quantity">¿Cuántos stocks comprarías?</label>
        <input 
          type="number" 
          id="quantity" 
          value={quantity} 
          onChange={e => setQuantity(e.target.value)} 
          min="1"
        />
        <label htmlFor="savingTime">¿Por cuantos días los ahorrarías?</label>
        <input 
          type="number" 
          id="savingTime" 
          value={savingTime} 
          onChange={e => setSavingTime(e.target.value)} 
          min="1"
        />
        <button onClick={requestPrediction} style={{ width: '100%' }}>
          SOLICITAR PREDICCIÓN
        </button>
        <p style={{ textAlign: 'center' }}>{predictionMessage}</p>
        {predictionSuccess && <button onClick={() => navigate(`/detallePrediccion/${predictionId}/${currentCompany.shortName}`)}>Ver Detalle de la Predicción</button>}
      </div>
    </div>
    
  );
};

export default DetalleEmpresa;


