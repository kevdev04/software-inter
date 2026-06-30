import { Link, useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const statsData = [
  { label: "Objetos reportados", value: 24},
  { label: "Reclamaciones pendientes", value: 8},
  { label: "Usuarios registrados", value: 132},
];

const recentObjects = [
  {
    id: 1,
    nombre: "Mochila Negra",
    descripcion: "Marca Tech, dejada en el laboratorio 3. Contiene libretas.",
    fecha: "17 Jun 2026",
    estado: "Pendiente",
  },
  {
    id: 2,
    nombre: "Audífonos Sony WH-1000XM4",
    descripcion: "Color gris oscuro, encontrados en las bancas de la explanada.",
    fecha: "16 Jun 2026",
    estado: "Validado",
  },
  {
    id: 3,
    nombre: "Termo Stanley Azul",
    descripcion: "Olvidado en el área de la biblioteca del piso superior.",
    fecha: "15 Jun 2026",
    estado: "Reclamado",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || '{"nombre": "Administrador"}');

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
                <p className="stat-value">{stat.value}</p>
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
            {recentObjects.map((obj) => (
              <div className="object-card" key={obj.id}>
                <div className="object-img">[ Imagen del Objeto ]</div>
                <div className="object-info">
                  <h3 className="object-nombre">{obj.nombre}</h3>
                  <p className="object-descripcion">{obj.descripcion}</p>
                  <div className="object-footer">
                    <span className="object-fecha">📅 {obj.fecha}</span>
                    <span className={`badge badge-${obj.estado.toLowerCase()}`}>
                      {obj.estado}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}