import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ResultadosBusqueda.css";

function ResultadosBusqueda() {
  const [searchParams] = useSearchParams();
  const terminoInicial = searchParams.get("q") || "";
  const [termino, setTermino] = useState(terminoInicial);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (termino.trim() === "") return;

    fetch(
      "http://localhost/InventariosGrupo9/buscar_productos.php?q=" +
        encodeURIComponent(termino)
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.exito) {
          setProductos(data.productos);
        } else {
          setProductos([]);
        }
      })
      .catch((err) => console.error("Error en búsqueda:", err));
  }, [termino]);

  return (
    <div className="busqueda-panel">
      <h2 className="busqueda-titulo">Buscar productos</h2>

      <div className="busqueda-barra">
        <input
          type="text"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          placeholder="Escribe nombre, marca o categoría..."
        />
        <button onClick={() => setTermino(termino)} className="btn-buscar">
          🔍 Buscar
        </button>
      </div>

      {productos.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.marca}</td>
                <td>{p.categoria}</td>
                <td>{p.descripcion}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ResultadosBusqueda;
