import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 👈 importar Link
import ProductoCard from "./ProductoCard";
import "./InventoryList.css";

function BuscarProductos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    if (busqueda.trim() === "") {
      setProductos([]);
      return;
    }

    const url = `http://localhost/InventariosGrupo9/buscar_productos.php?q=${encodeURIComponent(
      busqueda
    )}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta API búsqueda:", data);
        if (data.exito) {
          setProductos(data.productos);
        } else {
          setProductos([]);
        }
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setProductos([]);
      });
  }, [busqueda]);

  return (
    <div className="buscar-productos container">
      <h2 className="titulo-institucional">Buscar productos</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Escribe el nombre o marca..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {busqueda.trim() === "" ? (
        <p className="mensaje-vacio">
          Escribe un criterio de búsqueda para ver los productos.
        </p>
      ) : productos.length === 0 ? (
        <p className="mensaje-vacio">
          No se encontraron productos con ese criterio.
        </p>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <div className="col-md-4 mb-3" key={producto.id}>
              {/* 👇 enlace directo a ResultadosBusqueda.jsx */}
              <Link
                to={`/resultados?q=${encodeURIComponent(producto.nombre)}`}
                className="enlace-producto"
              >
                <ProductoCard {...producto} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuscarProductos;
