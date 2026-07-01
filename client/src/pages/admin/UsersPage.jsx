import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  listarUsuariosService,
  toggleActivoService,
  eliminarUsuarioService,
} from "../../services/users.service";
import "./UsersPage.css";

function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterRol, setFilterRol] = useState("Todos");

  const cargarUsuarios = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listarUsuariosService();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const rolLegible = u.rol === "admin" ? "Administrador" : "Usuario";
    const matchesRol = filterRol === "Todos" || rolLegible === filterRol;
    return matchesSearch && matchesRol;
  });

  const toggleEstado = async (id) => {
    try {
      const actualizado = await toggleActivoService(id);
      setUsers((prev) => prev.map((u) => (u.id === id ? actualizado : u)));
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await eliminarUsuarioService(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Objetos Perdidos</h2>
          <p>Panel Admin</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/admin/moderacion" className="nav-item">Moderación</Link>
          <Link to="/admin/historial" className="nav-item">Historial</Link>
          <Link to="/admin/usuarios" className="nav-item active">Usuarios</Link>
        </nav>

        <button className="logout-btn" onClick={() => navigate("/login")}>
          Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="user-info">
            <span>Administrador FCC</span>
            <div className="avatar">A</div>
          </div>
        </header>

        <div className="page-title">
          <h1>Usuarios</h1>
          <p>Gestión de usuarios registrados en el sistema</p>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <h3>{loading ? "…" : users.length}</h3>
            <p>Usuarios totales</p>
          </div>
          <div className="stat-card">
            <h3>{loading ? "…" : users.filter((u) => u.activo).length}</h3>
            <p>Usuarios activos</p>
          </div>
          <div className="stat-card">
            <h3>{loading ? "…" : users.filter((u) => u.rol === "admin").length}</h3>
            <p>Administradores</p>
          </div>
        </div>

        <div className="table-card">
          <div className="table-toolbar">
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <select
              value={filterRol}
              onChange={(e) => setFilterRol(e.target.value)}
              className="filter-select"
            >
              <option value="Todos">Todos los roles</option>
              <option value="Usuario">Usuario</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          {error && <p className="form-error">{error}</p>}

          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Registrado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="empty-row">Cargando usuarios...</td>
                </tr>
              ) : (
                <>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td className="user-name-cell">
                        <div className="mini-avatar">{u.nombre.charAt(0)}</div>
                        {u.nombre}
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-badge ${u.rol === "admin" ? "admin" : "user"}`}>
                          {u.rol === "admin" ? "Administrador" : "Usuario"}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${u.activo ? "active" : "blocked"}`}>
                          {u.activo ? "Activo" : "Bloqueado"}
                        </span>
                      </td>
                      <td>{new Date(u.creado_en).toLocaleDateString("es-MX")}</td>
                      <td className="actions-cell">
                        <button className="action-btn toggle" onClick={() => toggleEstado(u.id)}>
                          {u.activo ? "Bloquear" : "Activar"}
                        </button>
                        <button className="action-btn delete" onClick={() => deleteUser(u.id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="empty-row">No se encontraron usuarios.</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default UsersPage;