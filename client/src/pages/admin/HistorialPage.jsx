import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { historialService } from "../../services/reportes.service";
import "./HistorialPage.css";

const FILTROS = ["Todos", "Validado", "Rechazado", "Reclamado"];

export default function HistorialPage() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [historialData, setHistorialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    historialService()
      .then(setHistorialData)
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar el historial");
      })
      .finally(() => setLoading(false));
  }, []);

  const datosFiltrados = historialData.filter((item) => {
    const coincideFiltro =
      filtro === "Todos" || item.tipo === filtro.toLowerCase();
    const coincideBusqueda =
      item.objeto.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.afectado.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.accion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideFiltro && coincideBusqueda;
  });

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Objetos Perdidos</h2>
          <p className="sidebar-role">Panel Admin</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/admin/moderacion" className="nav-item">Moderación</Link>
          <Link to="/admin/historial" className="nav-item active">Historial</Link>
          <Link to="/admin/usuarios" className="nav-item">Usuarios</Link>
        </nav>
        <button className="logout-button" onClick={() => navigate("/login")}>
          Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div className="topbar-search"></div>
          <div className="topbar-user">
            <span className="topbar-nombre">
              {JSON.parse(localStorage.getItem("usuario") || '{"nombre":"Admin"}').nombre}
            </span>
            <div className="topbar-avatar">A</div>
          </div>
        </div>

        <div className="page-header">
          <h1 className="page-title">Historial</h1>
          <p className="page-subtitle">Bitácora de todas las acciones realizadas en el sistema</p>
        </div>

        <div className="historial-toolbar">
          <div className="filtros">
            {FILTROS.map((f) => (
              <button
                key={f}
                className={`filtro-btn ${filtro === f ? "activo" : ""}`}
                onClick={() => setFiltro(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="buscador"
            placeholder="Buscar por objeto, usuario o acción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Registros</h2>
            <span className="total-registros">
              {loading ? "…" : `${datosFiltrados.length} resultado(s)`}
            </span>
          </div>

          <div className="table-wrapper">
            {loading ? (
              <p className="empty-msg">Cargando historial...</p>
            ) : error ? (
              <p className="empty-msg">{error}</p>
            ) : datosFiltrados.length === 0 ? (
              <p className="empty-msg">No hay registros que coincidan con la búsqueda.</p>
            ) : (
              <table className="historial-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Acción</th>
                    <th>Objeto</th>
                    <th>Realizado por</th>
                    <th>Afectado</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {datosFiltrados.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <span className={`badge badge-${item.tipo}`}>
                          {item.accion}
                        </span>
                      </td>
                      <td>{item.objeto}</td>
                      <td className="email-cell">{item.realizadoPor}</td>
                      <td className="email-cell">{item.afectado}</td>
                      <td>{item.fecha}</td>
                      <td>{item.hora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}