import React, { useState } from 'react';
import './ListaEmpresas.css';
import axios from 'axios';
import { useSearchParams, useParams } from 'react-router-dom';
/*
Detalle de Empresa:

URL: /empresa/:id
Componente: DetalleEmpresa.jsx
Descripción: Página que muestra el detalle histórico de una empresa específica 
y permite a los usuarios comprar acciones de esa empresa.
*/

const DetalleEmpresa = ({ stockData, itemsPerPage }) => {
  const [companieArray, setCompanieArray] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  let { id } = useParams();
  console.log(id);
  const page = searchParams.get('page');
  const size = searchParams.get('size');
  const GetStocks = async () => {
    const url =
      'http://localhost:4000/stocks/' +
      '{id}' +
      '/?page=' +
      page +
      '?size=' +
      size; // URL del endpoint en el backend
    try {
      const respuesta = await axios.get(url).catch((error) => {
        console.log('Error al obtener las existencias:', error);
      });
      let companiesArray = respuesta.data;
      for (const language of companiesArray) {
        console.log(language);
      }
      setCompanieArray(companieArray);
      console.log(companieArray);
    } catch (error) {
      console.log(error.message);
    }
  };
  GetStocks();
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <ul>
        {companieArray.map((stock, index) => (
          <li key={index}>
            {stock.name}: {stock.price}
          </li>
        ))}
      </ul>
      <div>
        <button
        // onClick={() => handlePageChange(currentPage - 1)}
        // disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
        // onClick={() => handlePageChange(currentPage + 1)}
        // disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default DetalleEmpresa;
