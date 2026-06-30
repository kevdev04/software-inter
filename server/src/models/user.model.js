const db = require('../config/db');

const findByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0];
};

module.exports = { findByEmail };