import { Link, useNavigate } from "react-router-dom";
import "./UserLayout.css";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const acciones = [
    {
      titulo: "Reportar un objeto",
      descripcion: "¿Encontraste algo? Repórtalo para que su dueño pueda reclamarlo.",
      ruta: "/reportar",
    },
    {
      titulo: "Objetos perdidos",
      descripcion: "Consulta los objetos que han sido reportados y validados.",
      ruta: "/objetos",
    },
    {
      titulo: "Buscar objeto",
      descripcion: "Filtra por categoría, zona o palabra clave.",
      ruta: "/objetos?buscar=1",
    },
    {
      titulo: "Notificaciones",
      descripcion: "Objetos reportados recientemente en la facultad.",
      ruta: "/notificaciones",
    },
  ];

  return (
    <div className="user-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Objetos Perdidos</h2>
          <p>Panel Usuario</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/home" className="nav-item active">Inicio</Link>
          <Link to="/reportar" className="nav-item">Reportar objeto</Link>
          <Link to="/objetos" className="nav-item">Objetos perdidos</Link>
          <Link to="/notificaciones" className="nav-item">Notificaciones</Link>
        </nav>

        <button className="logout-btn" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="user-info">
            <span>{usuario.nombre || "Usuario"}</span>
            <div className="avatar">{(usuario.nombre || "U").charAt(0)}</div>
          </div>
        </header>

        <div className="page-title">
          <h1>Bienvenido</h1>
          <p>¿Qué deseas hacer hoy?</p>
        </div>

        <div className="actions-grid">
          {acciones.map((a) => (
            <Link to={a.ruta} key={a.titulo} className="action-card">
              <span className="action-icon">{a.icono}</span>
              <h3>{a.titulo}</h3>
              <p>{a.descripcion}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}