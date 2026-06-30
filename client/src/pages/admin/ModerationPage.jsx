import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ModerationPage.css";

const initialReportes = [
  {
    id: 1,
    nombre: "Mochila negra",
    categoria: "Bolsas",
    zona: "CCO1",
    fecha: "2025-06-20",
    descripcion: "Mochila negra marca Jansport con cremallera rota en el bolsillo frontal.",
    reportadoPor: "juan.perez@estudiante.buap.mx",
    estado: "Pendiente",
    foto: null,
  },
  {
    id: 2,
    nombre: "Credencial BUAP",
    categoria: "Documentos",
    zona: "Explanada",
    fecha: "2025-06-19",
    descripcion: "Credencial universitaria a nombre de María López, generación 2022.",
    reportadoPor: "maria.lopez@estudiante.buap.mx",
    estado: "Pendiente",
    foto: null,
  },
  {
    id: 3,
    nombre: "Calculadora Casio",
    categoria: "Electrónica",
    zona: "Laboratorios",
    fecha: "2025-06-18",
    descripcion: "Calculadora científica Casio fx-991, color negro con tapa azul.",
    reportadoPor: "carlos.ramos@estudiante.buap.mx",
    estado: "Pendiente",
    foto: null,
  },
];

export default function ModerationPage() {
  const navigate = useNavigate();
  const [reportes, setReportes] = useState(initialReportes);
  const [seleccionado, setSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState("Pendiente");

  const handleAccion = (id, accion) => {
    setReportes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: accion } : r))
    );
    setSeleccionado(null);
  };

  const reportesFiltrados = reportes.filter((r) => r.estado === filtro);

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Objetos Perdidos</h2>
          <p className="sidebar-role">Panel Admin</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/admin/moderacion" className="nav-item active">Moderación</Link>
          <Link to="/admin/historial" className="nav-item">Historial</Link>
          <Link to="/admin/usuarios" className="nav-item">Usuarios</Link>
        </nav>
        <button className="logout-button" onClick={() => navigate("/login")}>
          🚪 Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Moderación</h1>
          <p className="page-subtitle">Valida o rechaza los reportes enviados por estudiantes</p>
        </div>

        <div className="filtros">
          {["Pendiente", "Validado", "Rechazado"].map((estado) => (
            <button
              key={estado}
              className={`filtro-btn ${filtro === estado ? "activo" : ""}`}
              onClick={() => setFiltro(estado)}
            >
              {estado}
              <span className="filtro-count">
                {reportes.filter((r) => r.estado === estado).length}
              </span>
            </button>
          ))}
        </div>

        <div className="moderation-layout">
          <div className="reportes-lista">
            {reportesFiltrados.length === 0 ? (
              <p className="empty-msg">No hay reportes con estado "{filtro}"</p>
            ) : (
              reportesFiltrados.map((reporte) => (
                <div
                  key={reporte.id}
                  className={`reporte-card ${seleccionado?.id === reporte.id ? "seleccionado" : ""}`}
                  onClick={() => setSeleccionado(reporte)}
                >
                  <div className="reporte-card-header">
                    <span className="reporte-nombre">{reporte.nombre}</span>
                    <span className={`badge badge-${reporte.estado.toLowerCase()}`}>
                      {reporte.estado}
                    </span>
                  </div>
                  <p className="reporte-meta">{reporte.categoria} · {reporte.zona}</p>
                  <p className="reporte-fecha">{reporte.fecha}</p>
                </div>
              ))
            )}
          </div>

          <div className="reporte-detalle">
            {seleccionado ? (
              <>
                <h2 className="detalle-titulo">{seleccionado.nombre}</h2>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <span className="detalle-label">Categoría</span>
                    <span className="detalle-value">{seleccionado.categoria}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Zona</span>
                    <span className="detalle-value">{seleccionado.zona}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Fecha</span>
                    <span className="detalle-value">{seleccionado.fecha}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Reportado por</span>
                    <span className="detalle-value">{seleccionado.reportadoPor}</span>
                  </div>
                </div>
                <div className="detalle-descripcion">
                  <span className="detalle-label">Descripción</span>
                  <p className="detalle-desc-texto">{seleccionado.descripcion}</p>
                </div>
                {seleccionado.estado === "Pendiente" && (
                  <div className="detalle-acciones">
                    <button
                      className="btn-validar"
                      onClick={() => handleAccion(seleccionado.id, "Validado")}
                    >
                      ✅ Validar reporte
                    </button>
                    <button
                      className="btn-rechazar"
                      onClick={() => handleAccion(seleccionado.id, "Rechazado")}
                    >
                      ❌ Rechazar reporte
                    </button>
                  </div>
                )}
                {seleccionado.estado !== "Pendiente" && (
                  <p className="detalle-resuelto">
                    Este reporte ya fue <strong>{seleccionado.estado.toLowerCase()}</strong>.
                  </p>
                )}
              </>
            ) : (
              <div className="detalle-vacio">
                <p>Selecciona un reporte para ver el detalle</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}