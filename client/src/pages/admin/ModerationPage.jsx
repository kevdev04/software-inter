import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  listarReportesService,
  actualizarEstadoService,
  registrarEntregaService,
  imagenUrl,
} from "../../services/reportes.service";
import "./ModerationPage.css";

export default function ModerationPage() {
  const navigate = useNavigate();
  const [reportes, setReportes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState("Pendiente");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nombreReclamante, setNombreReclamante] = useState("");
  const [matriculaReclamante, setMatriculaReclamante] = useState("");
  const [entregando, setEntregando] = useState(false);
  const [errorEntrega, setErrorEntrega] = useState("");

  const [imagenAmpliada, setImagenAmpliada] = useState(null);

  const cargarReportes = async (estado) => {
    setLoading(true);
    setError("");
    try {
      const data = await listarReportesService({ estado });
      setReportes(data);
      setSeleccionado(null);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los reportes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReportes(filtro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtro]);

  const handleAccion = async (id, accion) => {
    try {
      await actualizarEstadoService(id, accion);
      setReportes((prev) => prev.filter((r) => r.id !== id));
      setSeleccionado(null);
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el estado del reporte");
    }
  };

  const handleEntrega = async (e) => {
    e.preventDefault();
    setErrorEntrega("");

    if (!nombreReclamante.trim() || !matriculaReclamante.trim()) {
      setErrorEntrega("Nombre y matrícula son obligatorios");
      return;
    }

    try {
      setEntregando(true);
      await registrarEntregaService(seleccionado.id, {
        nombre_reclamante: nombreReclamante,
        matricula_reclamante: matriculaReclamante,
      });
      setReportes((prev) => prev.filter((r) => r.id !== seleccionado.id));
      setSeleccionado(null);
      setNombreReclamante("");
      setMatriculaReclamante("");
    } catch (err) {
      console.error(err);
      setErrorEntrega(err?.response?.data?.message || "No se pudo registrar la entrega");
    } finally {
      setEntregando(false);
    }
  };

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
          Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Moderación</h1>
          <p className="page-subtitle">Valida reportes y registra la entrega de objetos reclamados</p>
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
                {filtro === estado ? reportes.length : ""}
              </span>
            </button>
          ))}
        </div>

        <div className="moderation-layout">
          <div className="reportes-lista">
            {loading ? (
              <p className="empty-msg">Cargando reportes...</p>
            ) : error ? (
              <p className="empty-msg">{error}</p>
            ) : reportes.length === 0 ? (
              <p className="empty-msg">No hay reportes con estado "{filtro}"</p>
            ) : (
              reportes.map((reporte) => (
                <div
                  key={reporte.id}
                  className={`reporte-card ${seleccionado?.id === reporte.id ? "seleccionado" : ""}`}
                  onClick={() => {
                    setSeleccionado(reporte);
                    setErrorEntrega("");
                    setNombreReclamante("");
                    setMatriculaReclamante("");
                  }}
                >
                  <div className="reporte-card-header">
                    <span className="reporte-nombre">{reporte.nombre_objeto}</span>
                    <span className={`badge badge-${reporte.estado.toLowerCase()}`}>
                      {reporte.estado}
                    </span>
                  </div>
                  <p className="reporte-meta">{reporte.categoria} · {reporte.zona}</p>
                  <p className="reporte-fecha">
                    {new Date(reporte.fecha_encontrado).toLocaleDateString("es-MX")}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="reporte-detalle">
            {seleccionado ? (
              <>
                <h2 className="detalle-titulo">{seleccionado.nombre_objeto}</h2>

                {seleccionado.imagen && (
                  <img
                    src={imagenUrl(seleccionado.imagen)}
                    alt={seleccionado.nombre_objeto}
                    className="detalle-imagen"
                    onClick={() => setImagenAmpliada(imagenUrl(seleccionado.imagen))}
                  />
                )}

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
                    <span className="detalle-value">
                      {new Date(seleccionado.fecha_encontrado).toLocaleDateString("es-MX")}
                    </span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Hora</span>
                    <span className="detalle-value">{seleccionado.hora_encontrado}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Reportado por</span>
                    <span className="detalle-value">
                      {seleccionado.reportado_por} ({seleccionado.reportado_por_email})
                    </span>
                  </div>
                </div>

                <div className="detalle-descripcion">
                  <span className="detalle-label">Descripción</span>
                  <p className="detalle-desc-texto">
                    {seleccionado.descripcion || "Sin descripción"}
                  </p>
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

                {seleccionado.estado === "Validado" && (
                  <div className="entrega-form">
                    <h3 className="entrega-titulo">Registrar entrega</h3>
                    <p className="entrega-subtitulo">
                      Captura los datos del alumno una vez que confirmes en persona que el objeto es suyo.
                    </p>
                    <form onSubmit={handleEntrega}>
                      <div className="input-group">
                        <label>Nombre del alumno</label>
                        <input
                          type="text"
                          value={nombreReclamante}
                          onChange={(e) => setNombreReclamante(e.target.value)}
                          placeholder="Nombre completo"
                        />
                      </div>
                      <div className="input-group">
                        <label>Matrícula</label>
                        <input
                          type="text"
                          value={matriculaReclamante}
                          onChange={(e) => setMatriculaReclamante(e.target.value)}
                          placeholder="Ej. 202312345"
                        />
                      </div>

                      {errorEntrega && <p className="form-error">{errorEntrega}</p>}

                      <button type="submit" className="btn-validar" disabled={entregando}>
                        {entregando ? "Registrando..." : "Confirmar entrega"}
                      </button>
                    </form>
                  </div>
                )}

                {(seleccionado.estado === "Rechazado" || seleccionado.estado === "Reclamado") && (
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

      {imagenAmpliada && (
        <div className="image-modal-overlay" onClick={() => setImagenAmpliada(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setImagenAmpliada(null)}>
              ✕
            </button>
            <img src={imagenAmpliada} alt="Vista completa" />
          </div>
        </div>
      )}
    </div>
  );
}