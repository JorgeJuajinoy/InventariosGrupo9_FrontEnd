import React, { useState } from "react";
import "./Login.css";
import { API_BASE } from "../config";

function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarLogin = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const respuesta = await fetch(`${API_BASE}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: correo.trim(),
          clave: clave.trim(),
        }),
      });

      // 👉 Si el servidor respondió con error HTTP
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }

      const resultado = await respuesta.json();
      console.log("Respuesta backend:", resultado);

      if (resultado.exito) {
        localStorage.setItem("correo", resultado.usuario.correo);
        localStorage.setItem("rol", resultado.usuario.rol);

        setMensaje("Ingreso exitoso ✅");

        switch (resultado.usuario.rol) {
          case "Cliente":
            window.location.href = "/cuenta-cliente";
            break;
          case "Operario":
            window.location.href = "/operario";
            break;
          case "Supervisor":
            window.location.href = "/supervisor";
            break;
          case "Administrador":
            window.location.href = "/administrador";
            break;
          case "Vendedor":
            window.location.href = "/vendedor";
            break;
          default:
            setMensaje("Rol no reconocido ❌");
        }
      } else {
        setMensaje(resultado.mensaje || "Credenciales incorrectas ❌");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setMensaje("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-titulo">Acceso al sistema</h2>

      <form onSubmit={manejarLogin} className="login-formulario">
        <label>Correo electrónico</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />

        <button type="submit" className="btn-institucional">
          Ingresar
        </button>
      </form>

      {mensaje && <p className="login-mensaje">{mensaje}</p>}
    </div>
  );
}

export default Login;
