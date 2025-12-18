// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import InventoryList from "./components/InventoryList";
import BuscarProductos from "./components/BuscarProductos";
import Login from "./components/Login";
import CrearCuenta from "./components/CrearCuenta";
import CuentaCliente from "./components/CuentaCliente";
import Operario from "./components/Operario";
import Supervisor from "./components/Supervisor";
import Administrador from "./components/Administrador";
import QuienesSomos from "./components/QuienesSomos";
import Vendedor from "./components/Vendedor";
import Categorias from "./components/Categorias";
import Marcas from "./components/Marcas";
import ResultadosBusqueda from "./components/ResultadosBusqueda";
import "./App.css";

function App() {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    fetch("http://localhost/InventariosGrupo9/productos_destacados.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos recibidos:", data);
        if (Array.isArray(data)) {
          setProductosDestacados(data);
        } else {
          console.error("Respuesta inesperada:", data);
        }
      })
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="vista-principal">
        <Sidebar />
        <main className="contenido-principal">
          <Routes>
            {/* Página principal */}
            <Route
              path="/"
              element={
                <>
                  <h2 className="seccion-titulo">Productos destacados</h2>
                  <InventoryList productos={productosDestacados} />
                </>
              }
            />

            {/* Vistas institucionales */}
            <Route path="/buscar" element={<BuscarProductos />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />

            {/* Autenticación y cuentas */}
            <Route path="/login" element={<Login />} />
            <Route path="/crear-cuenta" element={<CrearCuenta />} />
            <Route path="/cuenta-cliente" element={<CuentaCliente />} />

            {/* Roles */}
            <Route path="/operario" element={<Operario />} />
            <Route path="/supervisor" element={<Supervisor />} />
            <Route path="/administrador" element={<Administrador />} />
            <Route path="/vendedor" element={<Vendedor />} />
            <Route path="/cliente" element={<CuentaCliente />} />

            {/* APIs dinámicas */}
            {/* 👇 ahora Categorías y Marcas redirigen a ResultadosBusqueda */}
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/marcas" element={<Marcas />} />

            {/* Vista de resultados de búsqueda */}
            <Route path="/resultados" element={<ResultadosBusqueda />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
