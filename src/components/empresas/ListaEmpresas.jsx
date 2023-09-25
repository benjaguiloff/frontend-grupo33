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

const backendURL = process.env.REACT_APP_BACKEND_URL;

const CompaniesList = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  if (isAuthenticated) {
    // Obtener el token de acceso de forma silenciosa
    getAccessTokenSilently().then((accessToken) => {
      // Ahora puedes usar el token de acceso en tus solicitudes API
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    });
  }

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${backendURL}/stocks`);
        setCompanies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las empresas:', error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Empresas Disponibles</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {companies.map((company, index) => (
          <div key={index} style={{ width: "70%", textAlign: "center" }} className="card">
            {company.symbol}: {company.shortName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesList;