import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">
          <em>Ferretería Río Negro</em>
        </h1>
        <h2 className="navbar-slogan">Soluciones Que Construyen Confianza</h2>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Inicio
        </Link>
        <Link to="/login" className="nav-link">
          Mi cuenta
        </Link>
        <Link to="/crear-cuenta" className="nav-link">
          Crear cuenta
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
