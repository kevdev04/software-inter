import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  obtenerEstadisticasService,
  obtenerRecientesService,
} from "../../services/dashboard.service";
import { imagenUrl } from "../../services/reportes.service";
import "./DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || '{"nombre": "Administrador"}');

  const [stats, setStats] = useState({
    objetosReportados: 0,
    reclamacionesPendientes: 0,
    usuariosRegistrados: 0,
  });
  const [recentObjects, setRecentObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([obtenerEstadisticasService(), obtenerRecientesService()])
      .then(([statsData, recientesData]) => {
        setStats(statsData);
        setRecentObjects(recientesData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const statsData = [
    { label: "Objetos reportados", value: stats.objetosReportados },
    { label: "Reclamaciones pendientes", value: stats.reclamacionesPendientes },
    { label: "Usuarios registrados", value: stats.usuariosRegistrados },
  ];

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Objetos Perdidos</h2>
          <p className="sidebar-role">Panel Admin</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item active">Dashboard</Link>
          <Link to="/admin/moderacion" className="nav-item">Moderación</Link>
          <Link to="/admin/historial" className="nav-item">Historial</Link>
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
            <span className="topbar-nombre">{usuario.nombre}</span>
            <div className="topbar-avatar">
              {usuario.nombre.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Resumen general del sistema</p>
        </div>

        <div className="stats-grid">
          {statsData.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span className="stat-icon">{stat.icon}</span>
              <div>
                <p className="stat-value">{loading ? "…" : stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Objetos Recientes</h2>
            <Link to="/admin/moderacion" className="ver-todos">Ver todos →</Link>
          </div>

          <div className="cards-grid">
            {loading ? (
              <p className="stat-label">Cargando...</p>
            ) : recentObjects.length === 0 ? (
              <p className="stat-label">Aún no hay objetos reportados</p>
            ) : (
              recentObjects.map((obj) => (
                <div className="object-card" key={obj.id}>
                  <div className="object-img">
                    {obj.imagen ? (
                      <img
                        src={imagenUrl(obj.imagen)}
                        alt={obj.nombre_objeto}
                        className="object-img-real"
                      />
                    ) : (
                      "[ Imagen del Objeto ]"
                    )}
                  </div>
                  <div className="object-info">
                    <h3 className="object-nombre">{obj.nombre_objeto}</h3>
                    <p className="object-descripcion">
                      {obj.descripcion || "Sin descripción"}
                    </p>
                    <div className="object-footer">
                      <span className="object-fecha">
                        📅 {new Date(obj.creado_en).toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className={`badge badge-${obj.estado.toLowerCase()}`}>
                        {obj.estado}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}