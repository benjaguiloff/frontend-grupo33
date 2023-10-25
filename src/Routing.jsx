//import LoginPage from "../users/LoginPage";
//import SignupPage from "../users/SignupPage";
//import Home from "./common/Home";
//import CookieAuthProvider from "../contexts/cookieAuth";
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './common/About.jsx';
import App from './components/App';
import Layout from './common/Layout';
import BuyedStocks from './components/user-empresa/BuyedStocks.jsx';
import Wallet from './components/users/BilleteraVirtual.jsx';
import CompaniesList from './components/empresas/ListaEmpresas.jsx';
import CompanyDetail from './components/empresas/DetalleEmpresa.jsx';
import DetalleEmpresa from './components/empresas/DetalleEmpresa.jsx';

// Configurar el enrutamiento de la aplicación
function Routing() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/stocks" element={<BuyedStocks />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/empresa/:id" element={<DetalleEmpresa />} />

          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default Routing;
