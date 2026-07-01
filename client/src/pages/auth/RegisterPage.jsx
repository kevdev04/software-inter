import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../services/auth.service";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.endsWith("@estudiante.buap.mx")) {
      setError("Debes usar tu correo institucional (@estudiante.buap.mx)");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      setLoading(true);
      const data = await registerService(form.nombre, form.email, form.password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      navigate("/home");
    } catch (err) {
      setError(err.message || "Ocurrió un error al registrarte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Crear cuenta</h1>
        <p className="register-subtitle">Ingresa tus datos para registrarte</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label className="input-label">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez López"
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Correo institucional</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="usuario@estudiante.buap.mx"
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres"
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          {error && <p className="input-error">{error}</p>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="login-text">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="login-link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}