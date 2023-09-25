//import LoginPage from "../users/LoginPage";
//import SignupPage from "../users/SignupPage";
//import Home from "./common/Home";
//import CookieAuthProvider from "../contexts/cookieAuth";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./common/About.jsx";
import App from "./components/App";
import Layout from "./common/Layout";
import LoginPage from "./components/users/LoginPage";
import SignupPage from "./components/users/SignupPage";
import CompanyList from "./components/empresas/ListaEmpresas.jsx";
import DetalleEmpresa from "./components/empresas/DetalleEmpresa.jsx";
import BuyedStocks from './components/user-empresa/BuyedStocks.jsx';
import Wallet from './components/users/BilleteraVirtual.jsx';

// Configurar el enrutamiento de la aplicación
function Routing() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/stocks" element={<CompanyList />} />
            <Route path="/stocks/:id" element={<CompanyList />} />
            <Route path="/companies" element={<BuyedStocks />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default Routing;
