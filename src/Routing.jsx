import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './components/App';
import BuyedStocks from './components/user-empresa/BuyedStocks.jsx';
import Wallet from './components/users/BilleteraVirtual.jsx';
import CompaniesList from './components/empresas/ListaEmpresas.jsx';
import DetalleEmpresa from './components/empresas/DetalleEmpresa.jsx';
import CompraCompletada from './components/compras/CompraCompletada.jsx';
import ConfirmPurchase from './components/compras/ConfirmarCompra.jsx';
import WebPayRedirect from './components/compras/CompraEnProceso.jsx';
import DetallePrediccion from './components/empresas/DetallePrediccion.jsx';
import PredictionsList from './components/empresas/ListaPredicciones.jsx';
import ListaStocks from './components/user-empresa/ListaStocks.jsx';
import ListaPropuestasRecibidas from './components/user-empresa/ListaPropuestasRecibidas.jsx';
import ListaAuctions from './components/user-empresa/ListaAuctions.jsx';

// Configurar el enrutamiento de la aplicación
function Routing() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/stocks" element={<BuyedStocks />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/empresa/:id" element={<DetalleEmpresa />} />
            <Route path="/confirmarcompra" element={<ConfirmPurchase/>} />
            <Route path="/webpayredirect" element={<WebPayRedirect/>} />
            <Route path='/compracompletada' element={<CompraCompletada/>} />
            <Route path="/detallePrediccion/:predictionId/:companyShortName" element={<DetallePrediccion />} />
            <Route path="/predictions" element={<PredictionsList />} />
            <Route path="/buy_stocks" element={<ListaStocks />} />
            <Route path="/received_proposals" element={<ListaPropuestasRecibidas />} />
            <Route path="/auctions" element={<ListaAuctions />} />
          </Routes>
      </Router>
    </>
  );
}

export default Routing;
