import "./Marcas.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 👇 Importa la constante global
import { API_BASE } from "./config";

function Marcas() {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    // 👉 Ahora usamos API_BASE en lugar de localhost
    fetch(`${API_BASE}/marcas.php`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta API:", data);
        if (data.exito) {
          setMarcas(data.data);
        }
      })
      .catch((err) => console.error("Error al cargar marcas:", err));
  }, []);

  return (
    <div>
      <h3>Marcas</h3>
      {marcas.length === 0 ? (
        <p>Cargando marcas...</p>
      ) : (
        <ul>
          {marcas.map((marca) => (
            <li key={marca} className="marcas-texto">
              {/* 👇 acceso directo a resultados */}
              <Link to={`/resultados?q=${encodeURIComponent(marca)}`}>
                {marca}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Marcas;
