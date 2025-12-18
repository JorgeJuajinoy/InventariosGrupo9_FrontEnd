import React, { useState } from "react";
import "./Operario.css";

// 👇 Importa la constante global
import { API_BASE } from "./config";

function Operario() {
  const correo = localStorage.getItem("correo");
  const [formularioActivo, setFormularioActivo] = useState(null);

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleSubmit = async (e, tipo) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.tipo_movimiento = tipo;

    try {
      // 👉 Ahora usamos API_BASE en lugar de localhost
      const response = await fetch(`${API_BASE}/movimientos.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message || "Movimiento registrado correctamente ✅");
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Error al registrar movimiento ❌");
    }
  };

  const FormEntrada = () => (
    <form className="formulario" onSubmit={(e) => handleSubmit(e, "entrada")}>
      <h3>Registrar entrada de productos</h3>

      <div className="campo">
        <label htmlFor="nombre">Nombre:</label>
        <input id="nombre" name="nombre" type="text" required />
      </div>

      <div className="campo">
        <label htmlFor="marca">Marca:</label>
        <input id="marca" name="marca" type="text" required />
      </div>

      <div className="campo">
        <label htmlFor="categoria">Categoría:</label>
        <input id="categoria" name="categoria" type="text" required />
      </div>

      <div className="campo">
        <label htmlFor="precio">Precio:</label>
        <input id="precio" name="precio" type="number" step="0.01" required />
      </div>

      <div className="campo">
        <label htmlFor="cantidad">Cantidad:</label>
        <input id="cantidad" name="cantidad" type="number" required />
      </div>

      <div className="campo">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" rows="2"></textarea>
      </div>

      <button type="submit" className="btn-entrada">
        Registrar entrada
      </button>
    </form>
  );

  const FormSalida = () => (
    <form className="formulario" onSubmit={(e) => handleSubmit(e, "salida")}>
      <h3>Registrar salida de productos</h3>

      <div className="campo">
        <label htmlFor="nombre">Nombre:</label>
        <input id="nombre" name="nombre" type="text" required />
      </div>

      <div className="campo">
        <label htmlFor="cantidad">Cantidad:</label>
        <input id="cantidad" name="cantidad" type="number" required />
      </div>

      <button type="submit" className="btn-salida">
        Registrar salida
      </button>
    </form>
  );

  return (
    <div className="operario-panel">
      <h2 className="operario-titulo">Bienvenido Operario</h2>
      <p className="operario-correo">Sesión iniciada como: {correo}</p>

      <section className="operario-seccion">
        <h3>Registro de movimientos</h3>
        <div className="botones-movimientos">
          <button
            onClick={() => setFormularioActivo("entrada")}
            className="btn-opcion"
          >
            Registrar entrada
          </button>
          <button
            onClick={() => setFormularioActivo("salida")}
            className="btn-opcion"
          >
            Registrar salida
          </button>
        </div>

        {formularioActivo === "entrada" && <FormEntrada />}
        {formularioActivo === "salida" && <FormSalida />}
      </section>

      <button onClick={cerrarSesion} className="btn-institucional">
        Cerrar sesión
      </button>
    </div>
  );
}

export default Operario;
