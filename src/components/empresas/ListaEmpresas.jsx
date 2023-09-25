import React, { useState } from "react";
import "./ListaEmpresas.css";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';



axios.defaults.withCredentials = true;
/*
Ruta de Lista de Empresas:

URL: /empresas
Componente: ListaEmpresas.jsx
Descripción: Página que muestra una lista 
de empresas disponibles para comprar acciones.
*/
function CompanyList() {
    const [companiesArray, setCompaniesArray] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page');
    const GetCompanies = async () => {
        const url = "http://localhost:4000/stocks?page="+page; // URL del endpoint en el backend
        try {
            const respuesta = await axios
            .get(url)
            .catch((error) => {
                console.log("Error al obtener las existencias:", error);
            })
            let companiesArray = respuesta.data;
            for (const language of companiesArray) {
                console.log(language);
              }
              setCompaniesArray(companiesArray);
        }
        
        catch (error) {
            console.log(error.message);
        }};
    GetCompanies();
    return (
            <div className="CompanyList">
                <h1>Listado de Empresas</h1>
                <List companies={companiesArray} />
            </div>
    )
}

function List({ companies }) {
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
    <h3>{company.shortName} : {company.symbol}</h3>
    <h5>Stock Price: {company.price}</h5><p><button onClick={handleBuy}>Buy</button> </p>
    </div>
);
}

export default CompanyList;