import "./Categorias.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost/InventariosGrupo9/categorias.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta API:", data);
        if (data.exito) {
          setCategorias(data.data);
        }
      })
      .catch((err) => console.error("Error al cargar categorías:", err));
  }, []);

  return (
    <div>
      <h3>Categorías</h3>
      {categorias.length === 0 ? (
        <p>Cargando categorías...</p>
      ) : (
        <ul>
          {categorias.map((cat) => (
            <li key={cat} className="categorias-texto">
              {/* 👇 acceso directo a resultados */}
              <Link to={`/resultados?q=${encodeURIComponent(cat)}`}>{cat}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categorias;
