import React, { useState } from "react";
/*
Detalle de Empresa:

URL: /empresa/:id
Componente: DetalleEmpresa.jsx
Descripción: Página que muestra el detalle histórico de una empresa específica 
y permite a los usuarios comprar acciones de esa empresa.
*/

const DetalleEmpresa = ({ stockData, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  axios.get("https://localhost:4000/stocks/:id")
    .then((response) => {
        console.log("TEST");})

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStocks = stockData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(stockData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <ul>
        {currentStocks.map((stock, index) => (
          <li key={index}>{stock.name}: {stock.price}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default DetalleEmpresa;