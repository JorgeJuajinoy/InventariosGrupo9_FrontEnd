import React, { useState } from "react";
import "./CrearCuenta.css";

// 👇 Importa la constante global
import { API_BASE } from "./config";

function CrearCuenta() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    rol: "Cliente",
    estado: "activo",
    telefono: "",
    direccion: "",
    fecha_nacimiento: "",
    genero: "",
  });

  const [mensaje, setMensaje] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const datos = new FormData();
      Object.keys(formData).forEach((key) => {
        datos.append(key, formData[key]);
      });

      // 👉 Ahora usamos API_BASE en lugar de localhost
      const respuesta = await fetch(`${API_BASE}/crear_cuenta.php`, {
        method: "POST",
        body: datos,
      });

      const resultado = await respuesta.json();
      if (resultado.exito) {
        setMensaje("Usuario creado exitosamente ✅");
        setFormData({
          nombre: "",
          apellidos: "",
          correo: "",
          contrasena: "",
          rol: "Cliente",
          estado: "activo",
          telefono: "",
          direccion: "",
          fecha_nacimiento: "",
          genero: "",
        });
      } else {
        setMensaje(resultado.mensaje || "Error al crear usuario ❌");
      }
    } catch (error) {
      setMensaje("Error de conexión con el servidor");
    }
  };

  return (
    <div className="crear-cuenta-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={manejarSubmit} className="crear-cuenta-form">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={manejarCambio}
          required
        />

        <label>Apellidos</label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={manejarCambio}
          required
        />

        <label>Correo</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={manejarCambio}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="contrasena"
          value={formData.contrasena}
          onChange={manejarCambio}
          required
        />

        <label>Rol</label>
        <select name="rol" value={formData.rol} onChange={manejarCambio}>
          <option value="Cliente">Cliente</option>
          <option value="Operario">Operario</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
        </select>

        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={manejarCambio}
        />

        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={manejarCambio}
        />

        <label>Fecha de nacimiento</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={manejarCambio}
        />

        <label>Género</label>
        <select name="genero" value={formData.genero} onChange={manejarCambio}>
          <option value="">Seleccione</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>

        <button type="submit" className="btn-institucional">
          Crear cuenta
        </button>
      </form>
      {mensaje && <p className="crear-cuenta-mensaje">{mensaje}</p>}
    </div>
  );
}

export default CrearCuenta;
