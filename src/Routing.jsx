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

// Configurar el enrutamiento de la aplicación
function Routing() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/companies" element={<BuyedStocks />} />
          
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default Routing;
