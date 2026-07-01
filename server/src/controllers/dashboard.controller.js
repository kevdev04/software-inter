const db = require('../config/db');

exports.obtenerEstadisticas = async (req, res, next) => {
  try {
    const [[{ totalReportes }]] = await db.query(
      `SELECT COUNT(*) AS totalReportes FROM reportes`
    );

   const [[{ pendientes }]] = await db.query(
  `SELECT COUNT(*) AS pendientes FROM reportes WHERE estado = 'Validado'`
);

    const [[{ totalUsuarios }]] = await db.query(
      `SELECT COUNT(*) AS totalUsuarios FROM usuarios`
    );

    res.json({
      objetosReportados: totalReportes,
      reclamacionesPendientes: pendientes,
      usuariosRegistrados: totalUsuarios,
    });
  } catch (err) {
    next(err);
  }
};

exports.obtenerRecientes = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT r.id, r.nombre_objeto, r.categoria, r.descripcion, r.imagen, r.zona, r.estado, r.creado_en,
              u.nombre AS reportado_por
       FROM reportes r
       JOIN usuarios u ON u.id = r.usuario_id
       ORDER BY r.creado_en DESC
       LIMIT 3`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};