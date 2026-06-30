import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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

    console.log("Registro con:", form);
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

          <button type="submit" className="register-button">
            Registrarse
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