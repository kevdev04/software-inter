const API_URL = 'https://software-inter.onrender.com';

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export const listarUsuariosService = async () => {
  const response = await fetch(`${API_URL}/usuarios`, {
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al obtener usuarios');
  return data;
};

export const toggleActivoService = async (id) => {
  const response = await fetch(`${API_URL}/usuarios/${id}/toggle-activo`, {
    method: 'PATCH',
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al actualizar usuario');
  return data;
};

export const eliminarUsuarioService = async (id) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error al eliminar usuario');
  return data;
};