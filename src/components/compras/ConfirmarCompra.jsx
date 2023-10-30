import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CompraContext } from './CompraContext';
import { useLocation, useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const CancelToken = axios.CancelToken;
let cancel;

function ConfirmPurchase() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const receivedData =  searchParams.get('data');
  const jsonData = JSON.parse(receivedData);
  const navigate = useNavigate(); 
  const [showForm, setShowForm] = useState(false); // Nuevo estado para mostrar el formulario
  const [formData, setFormData] = useState({
      url: '',
      token: '',
    });
    // Código para redirigir a WEBPAY
    useEffect(() => {
      const FetchWebPay = async () => {
        try {
          if (cancel) {
            cancel('Request canceled');
          }
          const response = await axios.get(`${backendURL}/purchases/webpay`,{
          cancelToken: new CancelToken(function executor(c) {
            // Set a reference to the cancel function
            cancel = c;
          }),});
          setFormData(response.data);
          setShowForm(true);
        }
        catch (error) {
          console.log(error);
        }
      };
      FetchWebPay();
  }, []);
  const handleForm = (event) => {
    navigate(`/empresa/${jsonData.symbol}`);
  };

  return (
    <div>
      <p style={{textAlign: 'center'}}>¿Estás seguro de que quieres comprar {jsonData.cantidad} accion(es) de la empresa {jsonData.nombreStock} al precio total de {jsonData.precioTotal} USD?</p>
      <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
        <form method="post" action={''} onSubmit={handleForm} style={{ margin: '10px',textAlign: 'center' }}>
          <input type="submit" value="Cancelar Compra" />
        </form>
        {showForm ? (
          <form method="post" action={formData.url} style={{ margin: '10px',textAlign: 'center' }}>
          <input type="hidden" name="token_ws" value={formData.token} />
          <input type="submit" value="Confirmar Compra" />
        </form>
        ) : null}
      </div>
    </div>
  );
};

export default ConfirmPurchase;
