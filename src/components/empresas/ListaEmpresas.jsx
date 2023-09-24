import React, { useState } from "react";
import axios from "axios";
import "./ListaEmpresas.css";
/*
Ruta de Lista de Empresas:

URL: /empresas
Componente: ListaEmpresas.jsx
Descripción: Página que muestra una lista 
de empresas disponibles para comprar acciones.
*/
function CompanyList() {
   return (
        <div className="CompanyList">
            <h1>Listado de Empresas</h1>
            <List companies={companies} />
        </div>
   )
}

const companies = [
    { id: 1, name: 'Company A', stockPrice: 100 },
    { id: 2, name: 'Company B', stockPrice: 150 },
    { id: 3, name: 'Company C', stockPrice: 80 },
  ];

function List({ companies }) {
    axios.get("https://localhost:4000/stocks")
    .then((response) => {
        console.log("TEST");})
    return (
        <div>
        <ul>
            {companies.map((company) => (
            <li key={company.id}>
                <Company company={company} />
            </li>
            ))}
        </ul>
        </div>
    );
}

function Company({ company }) {
const [shares, setShares] = useState(0);

const handleBuy = () => {
    // TODO: Send a POST request to the server to buy shares of this company
};

return (
    <div>
    <h3>{company.name}</h3>
    <p>Stock Price: ${company.stockPrice} <button onClick={handleBuy}>Buy</button> </p>
    </div>
);
}

export default CompanyList;