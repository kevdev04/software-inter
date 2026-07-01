const db = require('../config/db');

// Crear un nuevo reporte (usuario)
exports.crearReporte = async (req, res, next) => {
  try {
    const { nombre_objeto, categoria, descripcion, fecha_encontrado, hora_encontrado, zona } = req.body;
    const usuario_id = req.usuario.id;
    const imagen = req.file ? req.file.filename : null;

    if (!nombre_objeto || !categoria || !fecha_encontrado || !hora_encontrado || !zona) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const [result] = await db.query(
      `INSERT INTO reportes 
        (nombre_objeto, categoria, descripcion, imagen, fecha_encontrado, hora_encontrado, zona, usuario_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre_objeto, categoria, descripcion || null, imagen, fecha_encontrado, hora_encontrado, zona, usuario_id]
    );

    res.status(201).json({ message: 'Reporte creado, en espera de validación', id: result.insertId });
  } catch (err) {
    next(err);
  }
};

// Listar reportes con filtros opcionales (usado por "Objetos perdidos" y "Buscar")
exports.listarReportes = async (req, res, next) => {
  try {
    const { categoria, zona, estado, q } = req.query;
    const esAdmin = req.usuario.rol === 'admin';

    // Los estudiantes NO ven descripcion ni imagen (solo el admin las necesita para validar reclamos)
    const campos = esAdmin
      ? `r.*`
      : `r.id, r.nombre_objeto, r.categoria, r.fecha_encontrado, r.hora_encontrado, r.zona, r.estado, r.usuario_id, r.creado_en`;

    let sql = `
      SELECT ${campos}, u.nombre AS reportado_por, u.email AS reportado_por_email
      FROM reportes r
      JOIN usuarios u ON u.id = r.usuario_id
      WHERE 1 = 1
    `;
    const params = [];

    if (!esAdmin) {
      sql += ` AND r.estado IN ('Validado', 'Reclamado')`;
    } else if (estado) {
      sql += ` AND r.estado = ?`;
      params.push(estado);
    }

    if (categoria) {
      sql += ` AND r.categoria = ?`;
      params.push(categoria);
    }

    if (zona) {
      sql += ` AND r.zona LIKE ?`;
      params.push(`%${zona}%`);
    }

    if (q) {
      sql += ` AND (r.nombre_objeto LIKE ? OR r.zona LIKE ?)`;
      params.push(`%${q}%`, `%${q}%`);
    }

    sql += ` ORDER BY r.creado_en DESC`;

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Reportes creados por el usuario en sesión ("mis reportes")
exports.misReportes = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM reportes WHERE usuario_id = ? ORDER BY creado_en DESC`,
      [req.usuario.id]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Notificaciones: objetos validados/reportados recientemente (últimos 5 días)
exports.notificaciones = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT r.id, r.nombre_objeto, r.categoria, r.fecha_encontrado, r.zona, r.estado, r.creado_en,
              u.nombre AS reportado_por
       FROM reportes r
       JOIN usuarios u ON u.id = r.usuario_id
       WHERE r.estado IN ('Validado', 'Reclamado')
         AND r.creado_en >= NOW() - INTERVAL 5 DAY
       ORDER BY r.creado_en DESC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Admin: actualizar estado (usado en Moderación)
exports.actualizarEstado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const estadosValidos = ['Pendiente', 'Validado', 'Reclamado', 'Rechazado'];

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }

    await db.query(`UPDATE reportes SET estado = ? WHERE id = ?`, [estado, id]);
    res.json({ message: 'Estado actualizado' });
  } catch (err) {
    next(err);
  }
};

exports.registrarEntrega = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_reclamante, matricula_reclamante } = req.body;

    if (!nombre_reclamante || !matricula_reclamante) {
      return res.status(400).json({ message: 'Nombre y matrícula son obligatorios' });
    }

    const [reporteRows] = await db.query(
      `SELECT estado FROM reportes WHERE id = ?`,
      [id]
    );

    if (reporteRows.length === 0) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    if (reporteRows[0].estado !== 'Validado') {
      return res.status(400).json({ message: 'Solo se puede entregar un objeto validado' });
    }

    await db.query(
      `UPDATE reportes 
       SET estado = 'Reclamado', nombre_reclamante = ?, matricula_reclamante = ?, fecha_entrega = NOW()
       WHERE id = ?`,
      [nombre_reclamante, matricula_reclamante, id]
    );

    res.json({ message: 'Entrega registrada correctamente' });
  } catch (err) {
    next(err);
  }
};

exports.historial = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT r.id, r.nombre_objeto, r.estado, r.fecha_encontrado, r.hora_encontrado,
              r.nombre_reclamante, r.matricula_reclamante, r.fecha_entrega, r.creado_en,
              u.nombre AS reportado_por, u.email AS reportado_por_email
       FROM reportes r
       JOIN usuarios u ON u.id = r.usuario_id
       WHERE r.estado IN ('Validado', 'Rechazado', 'Reclamado')
       ORDER BY COALESCE(r.fecha_entrega, r.creado_en) DESC`
    );

    // Transformamos cada reporte en un "evento" de historial legible
    const historial = rows.map((r) => {
      let accion, tipo, fechaEvento, afectado;

      if (r.estado === 'Reclamado') {
        accion = 'Objeto reclamado';
        tipo = 'reclamado';
        fechaEvento = r.fecha_entrega;
        afectado = r.matricula_reclamante
          ? `${r.nombre_reclamante} (${r.matricula_reclamante})`
          : '—';
      } else if (r.estado === 'Validado') {
        accion = 'Reporte validado';
        tipo = 'validado';
        fechaEvento = r.creado_en;
        afectado = r.reportado_por_email;
      } else {
        accion = 'Reporte rechazado';
        tipo = 'rechazado';
        fechaEvento = r.creado_en;
        afectado = r.reportado_por_email;
      }

      const fecha = new Date(fechaEvento);

      return {
        id: r.id,
        accion,
        tipo,
        objeto: r.nombre_objeto,
        realizadoPor: 'admin@estudiante.buap.mx', // toda acción de validar/rechazar/entregar la hace el admin
        afectado,
        fecha: fecha.toISOString().slice(0, 10),
        hora: fecha.toTimeString().slice(0, 5),
      };
    });

    res.json(historial);
  } catch (err) {
    next(err);
  }
};