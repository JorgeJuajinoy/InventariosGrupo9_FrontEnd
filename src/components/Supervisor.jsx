import React, { useState, useEffect } from "react";
import "./Supervisor.css";

function Supervisor() {
  const correo = localStorage.getItem("correo");
  const [movimientos, setMovimientos] = useState([]);
  const [productosCriticos, setProductosCriticos] = useState([]);

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // Función para cargar movimientos
  const cargarMovimientos = () => {
    fetch("http://localhost/InventariosGrupo9/visualizarmovimientos.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta API movimientos:", data);
        if (data.success) {
          setMovimientos(data.data);
        }
      })
      .catch((error) => console.error("Error al cargar movimientos:", error));
  };

  // Función para cargar productos críticos
  const cargarProductosCriticos = () => {
    fetch("http://localhost/InventariosGrupo9/bajostock.php?umbral=5")
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta API bajo stock:", data);
        if (data.success) {
          setProductosCriticos(data.data);
        }
      })
      .catch((error) =>
        console.error("Error al cargar productos críticos:", error)
      );
  };

  // Cargar datos al inicio
  useEffect(() => {
    cargarMovimientos();
    cargarProductosCriticos();
  }, []);

  // Función para actualizar ambos
  const actualizarDatos = () => {
    cargarMovimientos();
    cargarProductosCriticos();
  };

  return (
    <div className="supervisor-panel">
      <h2 className="supervisor-titulo">Bienvenido Supervisor</h2>
      <p className="supervisor-correo">Sesión iniciada como: {correo}</p>

      {/* Botón actualizar */}
      <div className="actualizar-container">
        <button onClick={actualizarDatos} className="btn-actualizar">
          🔄 Actualizar
        </button>
      </div>

      {/* Movimientos recientes */}
      <section className="supervisor-seccion">
        <h3>Movimientos recientes</h3>
        {movimientos.length === 0 ? (
          <p>No hay movimientos registrados aún.</p>
        ) : (
          <table className="tabla-movimientos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.nombre}</td>
                  <td>{m.tipo}</td>
                  <td>{m.cantidad}</td>
                  <td>{m.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Productos con bajo stock */}
      <section className="supervisor-seccion">
        <h3>Productos con bajo stock</h3>
        {productosCriticos.length === 0 ? (
          <p>No hay productos críticos.</p>
        ) : (
          <table className="tabla-stock">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {productosCriticos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.marca}</td>
                  <td>{p.categoria}</td>
                  <td>{p.stock}</td>
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

export default Supervisor;
