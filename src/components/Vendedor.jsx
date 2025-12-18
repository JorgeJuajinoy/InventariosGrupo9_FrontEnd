import React from "react";
import "./Vendedor.css";



function Vendedor() {
  const correo = localStorage.getItem("correo");

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="vendedor-panel">
      <h2 className="vendedor-titulo">Bienvenido Vendedor</h2>
      <p className="vendedor-correo">Sesión iniciada como: {correo}</p>

      <section className="vendedor-seccion">
        <h3>Gestión de pedidos</h3>
        <ul>
          <li>Registrar nuevos pedidos de clientes</li>
          <li>Consultar estado de pedidos</li>
          <li>Actualizar entregas realizadas</li>
        </ul>
      </section>

      <section className="vendedor-seccion">
        <h3>Catálogo de productos</h3>
        <ul>
          <li>Buscar productos disponibles</li>
          <li>Ver precios y promociones</li>
          <li>Filtrar por categoría o marca</li>
        </ul>
      </section>

      <section className="vendedor-seccion">
        <h3>Historial de ventas</h3>
        <ul>
          <li>Consultar ventas realizadas</li>
          <li>Generar comprobantes</li>
          <li>Exportar reportes</li>
        </ul>
      </section>

      <button onClick={cerrarSesion} className="btn-institucional">
        Cerrar sesión
      </button>
    </div>
  );
}

export default Vendedor;
