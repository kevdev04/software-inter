import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarReportesService, imagenUrl } from "../../services/reportes.service";
import "./UserLayout.css";
import "./LostObjectsPage.css";

const CATEGORIAS = ["Electrónicos", "Ropa", "Documentos", "Accesorios", "Libros/Libretas", "Otros"];

export default function LostObjectsPage() {
  const navigate = useNavigate();
  const [objetos, setObjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [categoria, setCategoria] = useState("");
  const [zona, setZona] = useState("");

  const cargar = async () => {
    setLoading(true);
    try {
      const data = await listarReportesService({ q, categoria, zona });
      setObjetos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltrar = (e) => {
    e.preventDefault();
    cargar();
  };

  return (
    <div className="user-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Objetos Perdidos</h2>
          <p>Panel Usuario</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/home" className="nav-item">Inicio</Link>
          <Link to="/reportar" className="nav-item">Reportar objeto</Link>
          <Link to="/objetos" className="nav-item active">Objetos perdidos</Link>
          <Link to="/notificaciones" className="nav-item">Notificaciones</Link>
        </nav>

        <button className="logout-btn" onClick={() => navigate("/login")}>
          Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        <div className="page-title">
          <h1>Objetos perdidos</h1>
          <p>Consulta y filtra los objetos reportados en la facultad</p>
        </div>

        <form className="filters-bar" onSubmit={handleFiltrar}>
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas las categorías</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Zona..."
            value={zona}
            onChange={(e) => setZona(e.target.value)}
          />
          <button type="submit">Filtrar</button>
        </form>

        {loading ? (
          <p className="empty-msg">Cargando objetos...</p>
        ) : objetos.length === 0 ? (
          <p className="empty-msg">No se encontraron objetos con esos filtros.</p>
        ) : (
          <div className="objects-grid">

            {objetos.map((o) => (
  <div className="object-card" key={o.id}>
    <div className="object-body">
      <h3>{o.nombre_objeto}</h3>
      <div className="object-meta">
        <span>🏷️ {o.categoria}</span>
        <span>📍 {o.zona}</span>
        <span>📅 {new Date(o.fecha_encontrado).toLocaleDateString("es-MX")}</span>
      </div>
      <p className="object-hint">
        ¿Es tuyo? Acude a la administración y describe sus características para reclamarlo.
      </p>
      <div className="object-footer">
        <span className={`status-badge ${o.estado.toLowerCase()}`}>{o.estado}</span>
        <span className="reporter">Por {o.reportado_por}</span>
      </div>
    </div>
  </div>
))}

          </div>
        )}
      </main>
    </div>
  );
}