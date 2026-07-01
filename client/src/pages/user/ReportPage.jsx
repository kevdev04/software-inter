import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { crearReporteService } from "../../services/reportes.service";
import "./UserLayout.css";
import "./ReportPage.css";

const CATEGORIAS = ["Electrónicos", "Ropa", "Documentos", "Accesorios", "Libros/Libretas", "Otros"];

export default function ReportPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre_objeto: "",
    categoria: "",
    descripcion: "",
    fecha_encontrado: new Date().toISOString().slice(0, 10),
    hora_encontrado: "",
    zona: "",
  });
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.nombre_objeto || !form.categoria || !form.fecha_encontrado || !form.hora_encontrado || !form.zona) {
      setError("Completa todos los campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (imagen) data.append("imagen", imagen);

      await crearReporteService(data);
      setSuccess("Reporte enviado correctamente. Un administrador lo validará pronto.");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Ocurrió un error al enviar el reporte");
    } finally {
      setLoading(false);
    }
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
          <Link to="/reportar" className="nav-item active">Reportar objeto</Link>
          <Link to="/objetos" className="nav-item">Objetos perdidos</Link>
          <Link to="/notificaciones" className="nav-item">Notificaciones</Link>
        </nav>

        <button className="logout-btn" onClick={() => navigate("/login")}>
          Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        <div className="page-title">
          <h1>Reportar objeto encontrado</h1>
          <p>Completa la información del objeto que encontraste</p>
        </div>

        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-col">
              <div className="input-group">
                <label>Nombre del objeto *</label>
                <input
                  type="text"
                  name="nombre_objeto"
                  value={form.nombre_objeto}
                  onChange={handleChange}
                  placeholder="Ej. Mochila Negra"
                />
              </div>

              <div className="input-group">
                <label>Categoría *</label>
                <select name="categoria" value={form.categoria} onChange={handleChange}>
                  <option value="">Selecciona una categoría</option>
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Marca, color, detalles adicionales..."
                  rows={4}
                />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Fecha en que se encontró *</label>
                  <input
                    type="date"
                    name="fecha_encontrado"
                    value={form.fecha_encontrado}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>Hora *</label>
                  <input
                    type="time"
                    name="hora_encontrado"
                    value={form.hora_encontrado}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Zona donde se encontró *</label>
                <input
                  type="text"
                  name="zona"
                  value={form.zona}
                  onChange={handleChange}
                  placeholder="Ej. Laboratorio 3, Biblioteca, Explanada..."
                />
              </div>
            </div>

            <div className="form-col">
              <div className="input-group">
                <label>Imagen del objeto</label>
                <div className="image-upload">
                  {preview ? (
                    <img src={preview} alt="preview" className="image-preview" />
                  ) : (
                    <span className="upload-placeholder">Selecciona una imagen</span>
                  )}
                  <input type="file" accept="image/*" onChange={handleImagen} />
                </div>
              </div>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Enviando..." : "Enviar reporte"}
          </button>
        </form>
      </main>
    </div>
  );
}