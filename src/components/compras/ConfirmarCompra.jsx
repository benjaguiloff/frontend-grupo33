import React, { useContext } from 'react';
import { CompraContext } from './CompraContext';

function ConfirmPurchase() {
  const { setCompra } = useContext(CompraContext);

  const handleCompra = () => {
    // Aquí lógica para iniciar la compra y redirigir a WEBPAY

    // Supongamos que tienes la información de la compra en una variable `infoCompra`
    const infoCompra = {
      nombreStock: 'Nombre del Stock',
      cantidad: 10,
      precioTotal: 1000,
    };

    setCompra(infoCompra);

    // Código para redirigir a WEBPAY
  };

  return (
    <div>
      {/* ...resto de tu componente */}
      <button onClick={handleCompra}>Confirmar Compra</button>
    </div>
  );
}

export default ConfirmPurchase;
