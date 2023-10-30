import React, { createContext, useState } from 'react';

const CompraContext = createContext();

const CompraProvider = ({ children }) => {
  const [compra, setCompra] = useState(null);

  return (
    <CompraContext.Provider value={{ compra, setCompra }}>
      {children}
    </CompraContext.Provider>
  );
};

export { CompraProvider, CompraContext };
