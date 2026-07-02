  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { loginService } from "../../services/auth.service";
  import "./LoginPage.css";

  export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      if (!email.endsWith("@estudiante.buap.mx")) {
        setError("Debes usar tu correo institucional (@estudiante.buap.mx)");
        return;
      }

      try {
        setLoading(true);
        const data = await loginService(email, password);

        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        if (data.usuario.rol === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Objetos Perdidos FCC</h1>
          <p className="login-subtitle">Inicia sesión con tu correo institucional</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label">Correo institucional</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@estudiante.buap.mx"
                className="input-field"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            {error && <p className="input-error">{error}</p>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="register-text">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="register-link">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    );
  }