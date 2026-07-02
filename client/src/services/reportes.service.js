import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://software-inter.onrender.com";

function authHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

export async function crearReporteService(formData) {
  const res = await axios.post(`${API_URL}/reportes`, formData, {
    headers: {
      ...authHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function listarReportesService(filtros = {}) {
  const res = await axios.get(`${API_URL}/reportes`, {
    headers: authHeaders(),
    params: filtros,
  });
  return res.data;
}

export async function notificacionesService() {
  const res = await axios.get(`${API_URL}/reportes/notificaciones`, {
    headers: authHeaders(),
  });
  return res.data;
}

export async function actualizarEstadoService(id, estado) {
  const res = await axios.patch(
    `${API_URL}/reportes/${id}/estado`,
    { estado },
    { headers: authHeaders() }
  );
  return res.data;
}

export async function registrarEntregaService(id, datos) {
  const res = await axios.patch(
    `${API_URL}/reportes/${id}/entrega`,
    datos,
    { headers: authHeaders() }
  );
  return res.data;
}

export function imagenUrl(nombreArchivo) {
  if (!nombreArchivo) return null;
  return `${API_URL}/uploads/${nombreArchivo}`;
}

export async function historialService() {
  const res = await axios.get(`${API_URL}/reportes/historial`, {
    headers: authHeaders(),
  });
  return res.data;
}