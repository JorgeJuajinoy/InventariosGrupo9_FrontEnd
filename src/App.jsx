import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { API_BASE } from "./config"; // 👈 IMPORTANTE
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import InventoryList from "./components/InventoryList";
import BuscarProductos from "./components/BuscarProductos";
import Categorias from "./components/Categorias";
import Marcas from "./components/Marcas";
import QuienesSomos from "./components/QuienesSomos";
import Login from "./components/Login";
import CrearCuenta from "./components/CrearCuenta";
import ResultadosBusqueda from "./components/ResultadosBusqueda";
import CuentaCliente from "./components/CuentaCliente";
import Operario from "./components/Operario";
import Supervisor from "./components/Supervisor";
import Administrador from "./components/Administrador";
import Vendedor from "./components/Vendedor";

function App() {
  const [productosDestacados, setProductosDestacados] = useState([]);
  // ... (keep useEffect as matches source)
  useEffect(() => {
    fetch(`${API_BASE}/productos_destacados.php`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error HTTP " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Productos recibidos:", data);
        if (Array.isArray(data)) {
          setProductosDestacados(data);
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
            <Route path="/" element={<InventoryList productos={productosDestacados} />} />
            <Route path="/buscar" element={<BuscarProductos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/crear-cuenta" element={<CrearCuenta />} />
            <Route path="/resultados" element={<ResultadosBusqueda />} />
            {/* Rutas de roles */}
            <Route path="/cuenta-cliente" element={<CuentaCliente />} />
            <Route path="/operario" element={<Operario />} />
            <Route path="/supervisor" element={<Supervisor />} />
            <Route path="/administrador" element={<Administrador />} />
            <Route path="/vendedor" element={<Vendedor />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
