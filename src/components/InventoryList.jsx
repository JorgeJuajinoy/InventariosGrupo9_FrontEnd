// src/components/InventoryList.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // 👈 importar Link
import "./InventoryList.css";

function InventoryList({ productos }) {
  const trackRef = useRef(null);
  const indexRef = useRef(0);

  const cardWidth = 320; // ancho de cada tarjeta + gap

  // Autoplay
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current * cardWidth >= track.scrollWidth - cardWidth * 3) {
        indexRef.current = 0; // reinicia al inicio
      }
      track.style.transform = `translateX(${-(
        indexRef.current * cardWidth
      )}px)`;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Navegación manual
  const handlePrev = () => {
    if (indexRef.current > 0) {
      indexRef.current -= 1;
      trackRef.current.style.transform = `translateX(${-(
        indexRef.current * cardWidth
      )}px)`;
    }
  };

  const handleNext = () => {
    if (
      indexRef.current * cardWidth <
      trackRef.current.scrollWidth - cardWidth * 3
    ) {
      indexRef.current += 1;
      trackRef.current.style.transform = `translateX(${-(
        indexRef.current * cardWidth
      )}px)`;
    }
  };

  return (
    <div className="carrusel-container">
      <button className="carrusel-btn prev" onClick={handlePrev}>
        ←
      </button>
      <div className="carrusel-productos">
        <div className="carrusel-track" ref={trackRef}>
          {productos.length === 0 ? (
            <p>No hay productos destacados.</p>
          ) : (
            productos.map((producto) => (
              <Link
                key={producto.id}
                to={`/resultados?q=${encodeURIComponent(producto.nombre)}`} // 👈 conecta con ResultadosBusqueda
                className="card-producto"
              >
                <h3>{producto.nombre}</h3>
                <p>
                  <strong>Marca:</strong> {producto.marca}
                </p>
                <p>
                  <strong>Categoría:</strong> {producto.categoria}
                </p>
                <p>
                  <strong>Precio:</strong> $
                  {parseFloat(producto.precio).toLocaleString()}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
      <button className="carrusel-btn next" onClick={handleNext}>
        →
      </button>
    </div>
  );
}

export default InventoryList;
