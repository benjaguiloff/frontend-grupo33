import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;
const CancelToken = axios.CancelToken;
let cancel;

function WebPayRedirect() {

  const [confirmed, setConfirmed] = useState(false);
  const [response_code, setResponded] = useState(-1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  var token_ws = "";
  try {
    token_ws = searchParams.get('token_ws');
  }
  catch (error) {
    console.log(error);
  }
  const navigate = useNavigate(); 

    // Código para redirigir a WEBPAY
useEffect(() => {
    const FetchWebPay = async () => {
        if (!confirmed) {
            setConfirmed(true); 
            try {
                if (cancel) {
                    cancel('Request canceled');
                }
                const response = await axios.post(`${backendURL}/purchases/webpayconfirm`,
                {
                    token_ws: token_ws},
                    {cancelToken: new CancelToken(function executor(c) {
                        // Set a reference to the cancel function
                        cancel = c;})
                });
                console.log(response.data);
                console.log(response_code);
                setResponded(response.data.response_code);
                console.log(response_code);
            }
            catch (error) {
                token_ws = "";
            }
        }
    };
    FetchWebPay();    
    }, []);


  const goBackToCompanies = () => {
    navigate('/companies');
  }

  if (token_ws == "" || token_ws == null) {
    return (
        <div style={{flex:"column"}}>
        <button  onClick={goBackToCompanies}>
        Volver
        </button>
        <div style={{margin: 30, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
        Compra anulada por el usuario.
        </div>
        </div>
      );
  }
  return (
    <div>
    <button  onClick={goBackToCompanies}>
        Volver
        </button>
      <div style={{margin: 30, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row'}}>
        Tu compra ha sido {response_code == 0 ? "confirmada" : "anulada"}.
      </div>
    </div>
  );
};

export default WebPayRedirect;
