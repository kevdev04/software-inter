import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

export async function obtenerEstadisticasService() {
  const res = await axios.get(`${API_URL}/dashboard/estadisticas`, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function obtenerRecientesService() {
  const res = await axios.get(`${API_URL}/dashboard/recientes`, {
    headers: authHeaders(),
  });
  return res.data;
}