const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await UserModel.findByEmail(email);
  if (!usuario) {
    return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
  }

  if (!usuario.activo) {
    return res.status(403).json({ message: 'Tu cuenta ha sido bloqueada. Contacta al administrador.' });
  }

  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) {
    return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
  }

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
  });
};

const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  if (!email.endsWith('@estudiante.buap.mx')) {
    return res.status(400).json({ message: 'Debes usar tu correo institucional (@estudiante.buap.mx)' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
  }

  const existente = await UserModel.findByEmail(email);
  if (existente) {
    return res.status(409).json({ message: 'Ese correo ya está registrado' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const usuario = await UserModel.create({ nombre, email, passwordHash });

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.status(201).json({ token, usuario });
};

module.exports = { login, register };