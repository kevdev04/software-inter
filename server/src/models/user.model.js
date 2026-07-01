const db = require('../config/db');

const UserModel = {
  async findByEmail(email) {
    const [rows] = await db.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
    return rows[0] || null;
  },

  async create({ nombre, email, passwordHash }) {
    const [result] = await db.query(
      `INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, 'student')`,
      [nombre, email, passwordHash]
    );
    return { id: result.insertId, nombre, email, rol: 'student' };
  },

  async findAll() {
    const [rows] = await db.query(
      `SELECT id, nombre, email, rol, activo, creado_en FROM usuarios ORDER BY creado_en DESC`
    );
    return rows;
  },

  async toggleActivo(id) {
    await db.query(
      `UPDATE usuarios SET activo = NOT activo WHERE id = ?`,
      [id]
    );
    const [rows] = await db.query(
      `SELECT id, nombre, email, rol, activo, creado_en FROM usuarios WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  async deleteById(id) {
    await db.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
  },
};

module.exports = UserModel;