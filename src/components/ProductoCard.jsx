import React from "react";
import "./ProductoCard.css";

function ProductoCard({ nombre, categoria, cantidad }) {
  return (
    <div className="card-producto">
      <h3>{nombre}</h3>
      <p>
        <strong>Categoría:</strong> {categoria}
      </p>
      <p>
        <strong>Cantidad:</strong> {cantidad}
      </p>
      <button className="btn-institucional">Ver detalles</button>
    </div>
  );
}

export default ProductoCard;
