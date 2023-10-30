import React, { useContext, useState, useEffect } from 'react';
import { CompraContext } from './CompraContext';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function CompraCompletada() {
  const { compra } = useContext(CompraContext);
  const [linkBoleta, setLinkBoleta] = useState(null);
  const [loading, setLoading] = useState(true);
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const endpoint_boleta = `${backend_url}/receipts`;
  const endpoint_email = `${backend_url}/emails`;
  const { user } = useAuth0();

  const userEmail = user.email;

  useEffect(() => {
    // Esta función realiza la solicitud para obtener la boleta y luego enviar el email
    const generarBoleta = async () => {
      try {
        const boleta = {
          groupNumber: 33, // Este es el número de grupo
          username: compra.username,
          stockName: compra.nombreStock,
          stockAmount: compra.cantidad,
          paidMoney: compra.precioTotal,
        };
        /* boleta
          {
            groupNumber:,
            username:,
            stockName:,
            stockAmount:,
            paidMoney:,
          }

          emailData
          {
            customerEmail:,
            receiptUrl:,
          }
        */

        const response = await axios.post(endpoint_boleta, boleta);

        // Una vez que se ha generado la boleta, enviar email al usuario
        if (response.data.link) {
          setLinkBoleta(response.data.link);

          const emailData = {
            customerEmail: userEmail,
            receiptUrl: response.data.link,
          };

          await axios.post(endpoint_email, emailData);
        }
      } catch (error) {
        console.error('Hubo un error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (compra) {
      generarBoleta();
    }
  }, [compra, endpoint_boleta, endpoint_email, userEmail]);

  if (!compra || loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Compra Completada</h1>
      <p>Nombre del Stock: {compra.nombreStock}</p>
      <p>Cantidad: {compra.cantidad}</p>
      <p>Precio Total: {compra.precioTotal}</p>
      <a href={linkBoleta} target="_blank" rel="noopener noreferrer">
        Ver Boleta
      </a>
    </div>
  );
}

export default CompraCompletada;
