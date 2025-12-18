import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-titulo">Explorar</h3>
      <ul className="sidebar-lista">
        <li>
          <Link to="/buscar" className="sidebar-link">
            Buscar productos
          </Link>
        </li>
        <li>
          <Link to="/categorias" className="sidebar-link">
            Categorías
          </Link>
        </li>
        <li>
          <Link to="/marcas" className="sidebar-link">
            Marcas
          </Link>
        </li>
        <li>
          <Link to="/quienes-somos" className="sidebar-link">
            ¿Quiénes Somos?
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
