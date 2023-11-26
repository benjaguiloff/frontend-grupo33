import axios from 'axios';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;

function WebPayRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token_ws = searchParams.get('token_ws') || '';
  const queryClient = useQueryClient();
  const [requestSent, setRequestSent] = useState(false);

  const {
    mutate: sendPostRequest,
    isLoading,
    data,
    error,
  } = useMutation(
    async () => {
      console.log('Sending post request from WebPayRedirect...');
      const response = await axios.post(
        `${backendURL}/purchases/webpayconfirm`,
        { token_ws }
      );
      console.log('Response from WebPayRedirect:', response.data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['someKey']);
        setRequestSent(true); // Actualizar el estado después de enviar la solicitud
      },
    }
  );

  useEffect(() => {
    if (token_ws && !requestSent) {
      sendPostRequest();
    }
  }, [token_ws, sendPostRequest, requestSent]);

  const goBackToCompanies = () => {
    navigate('/companies');
  };

  if (!token_ws) {
    return (
      <div style={{ flex: 'column' }}>
        <button onClick={goBackToCompanies}>Volver</button>
        <div
          style={{
            margin: 30,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          Compra anulada por el usuario.
        </div>
      </div>
    );
  }

  const responseCode = data?.response_code ?? -2; // -2: no ha respondido, 0: confirmado, 1: anulado

  return (
    <div>
      <button onClick={goBackToCompanies}>Volver</button>
      <div
        style={{
          margin: 30,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {isLoading ? (
          <span>Cargando...</span>
        ) : error ? (
          <span>Hubo un error en la solicitud</span>
        ) : (
          <span>
            Tu compra ha sido {responseCode === 0 ? 'confirmada' : 'rechazada'}.
          </span>
        )}
      </div>
    </div>
  );
}

export default WebPayRedirect;
