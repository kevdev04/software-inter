import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notificacionesService, imagenUrl } from "../../services/reportes.service";
import "./UserLayout.css";
import "./NotificationsPage.css";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notis, setNotis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificacionesService()
      .then(setNotis)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
          <Link to="/objetos" className="nav-item">Objetos perdidos</Link>
          <Link to="/notificaciones" className="nav-item active">Notificaciones</Link>
        </nav>

        <button className="logout-btn" onClick={() => navigate("/login")}>
          Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        <div className="page-title">
          <h1>Notificaciones</h1>
          <p>Objetos reportados recientemente (últimos 5 días)</p>
        </div>

        {loading ? (
          <p className="empty-msg">Cargando notificaciones...</p>
        ) : notis.length === 0 ? (
          <p className="empty-msg">No hay notificaciones nuevas.</p>
        ) : (
          <div className="notis-list">
            {notis.map((n) => (
              <div className="noti-card" key={n.id}>
                <div className="noti-image">
                  
                    <span>📦</span>
                
                </div>
                <div className="noti-body">
                  <h3>{n.nombre_objeto}</h3>
                  <p>
                    Reportado en <b>{n.zona}</b> el {new Date(n.fecha_encontrado).toLocaleDateString("es-MX")}
                  </p>
                </div>
                <span className={`status-badge ${n.estado.toLowerCase()}`}>{n.estado}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}