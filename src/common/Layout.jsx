import React from "react";
import NavBar from "./Navbar";

/*
Layout
- Componente que contiene el header de la aplicación
- Se utiliza en todas las páginas
- Se utiliza el componente NavBar para que todas las páginas tengan el mismo header
*/

function Layout(props) {
  // props.children: Contiene el contenido de la página
  return (
    <>
      <NavBar /> {/* Renderiza el header de la página */}
      {props.children} {/* Renderiza el contenido de la página */}
    </>
  );
}

export default Layout;
