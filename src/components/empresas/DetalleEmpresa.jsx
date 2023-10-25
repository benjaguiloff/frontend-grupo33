
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const purchaseURL = `${backendURL}/purchases`;

const DetalleEmpresa = ({ itemsPerPage }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [companieArray, setCompanieArray] = useState([]);
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const page = searchParams.get('page') || 1;
  const size = searchParams.get('size') || 5;

  const [message, setMessage] = useState('');
  const [currentCompany, setCurrentCompany] = useState(null);
  const [quantity, setQuantity] = useState(1); // Nuevo estado para la cantidad

  useEffect(() => {
    if (companieArray.length > 0) {
      setCurrentCompany(companieArray[0]);
    }
  }, [companieArray]);

  const buyStock = async () => {
    try {
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
      setMessage('Solicitud de compra enviada.');
    } catch (error) {
      console.error('Error al intentar comprar:', error);
      if (error.request.response.message == "No se cuenta con el dinero suficiente para comprar esta acción") {
        setMessage('No se cuenta con el dinero suficiente para comprar esta acción');
      } else {
        setMessage('Error al intentar comprar.');
      }
    }
  };

  useEffect(() => {
    const GetStocks = async () => {
      const url = `${backendURL}/stocks/${id}/?size=${500}`;
      try {
        const respuesta = await axios.get(url);
        setCompanieArray(respuesta.data);
        console.log(respuesta.data);
      } catch (error) {
        console.error('Error al obtener las existencias:', error);
      }
    };
    GetStocks();
  }, [id, page, size]);

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

  return (
    <div>
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
      <button onClick={buyStock} style={{ width: '100%' }}>
        COMPRAR
      </button>
      <p style={{ textAlign: 'center' }}>{message}</p>
    </div>
  );
};

export default DetalleEmpresa;


