/*
Ruta de Lista de Empresas:

URL: /empresas
Componente: ListaEmpresas.jsx
Descripción: Página que muestra una lista 
de empresas disponibles para comprar acciones.
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const backendURL = process.env.REACT_APP_BACKEND_URL;
const CancelToken = axios.CancelToken;
let cancel;

const CompaniesList = () => {
  const navigate = useNavigate(); // Usa el hook
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  if (isAuthenticated) {
    getAccessTokenSilently().then((accessToken) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    });
  }

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        if (cancel) {
          cancel('Request canceled');
        }
        const response = await axios.get(`${backendURL}/stocks`, {
          cancelToken: new CancelToken(function executor(c) {
            // Set a reference to the cancel function
            cancel = c;
          }),});
        setCompanies(response.data);
        setLoading(false);
      } catch (error) {
        // console.error('Error al obtener las empresas:', error);
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompanyClick = (id) => { // Función para manejar el clic
    navigate(`/empresa/${id}`);
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
      <h1 style={{ textAlign: "center" }}>Empresas Disponibles</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {companies.map((company, index) => (
          <div 
            key={index}
            style={{ width: "70%", textAlign: "center" }} 
            className="card"
            onClick={() => handleCompanyClick(company.symbol)}  // Añade el manejador del clic aquí
          >
            {company.symbol}: {company.shortName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesList;
