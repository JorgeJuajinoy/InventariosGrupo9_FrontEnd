import React, { useState, useEffect } from "react";
import "./Administrador.css";

// 👇 Importa la constante global desde config.js
import { API_BASE } from "./config";

function Administrador() {
  const correo = localStorage.getItem("correo");
  const [resumen, setResumen] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // Funciones para cargar datos
  const cargarResumen = () => {
    fetch(`${API_BASE}/resumen_stock.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setResumen(data.data);
      })
      .catch((err) => console.error("Error resumen stock:", err));
  };

  const cargarUsuarios = () => {
    fetch(`${API_BASE}/usuarios.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsuarios(data.data);
      })
      .catch((err) => console.error("Error usuarios:", err));
  };

  // Cargar datos al inicio
  useEffect(() => {
    cargarResumen();
    cargarUsuarios();
  }, []);

  // Función para actualizar ambos
  const actualizarDatos = () => {
    cargarResumen();
    cargarUsuarios();
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-titulo">Bienvenido Administrador</h2>
      <p className="admin-correo">Sesión iniciada como: {correo}</p>

      {/* Botón actualizar */}
      <div className="actualizar-container">
        <button onClick={actualizarDatos} className="btn-actualizar">
          🔄 Actualizar
        </button>
      </div>

      {/* Resumen de stock */}
      <section className="admin-seccion">
        <h3>Resumen del inventario</h3>
        {resumen ? (
          <div className="resumen-stock">
            <p>Total de productos: {resumen.total_productos}</p>
            <p>Stock total: {resumen.stock_total}</p>
            <p>
              Producto con mayor stock: {resumen.producto_mayor?.nombre} (
              {resumen.producto_mayor?.stock})
            </p>
          </div>
        ) : (
          <p>Cargando resumen...</p>
        )}
      </section>

      {/* Lista de usuarios */}
      <section className="admin-seccion">
        <h3>Usuarios registrados</h3>
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <table className="tabla-usuarios">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>{u.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <button onClick={cerrarSesion} className="btn-institucional">
        Cerrar sesión
      </button>
    </div>
  );
}

export default Administrador;
