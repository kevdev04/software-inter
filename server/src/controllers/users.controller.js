const UserModel = require('../models/user.model');

exports.listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await UserModel.findAll();
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

exports.toggleActivo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Evita que el admin se bloquee a sí mismo por accidente
    if (Number(id) === req.usuario.id) {
      return res.status(400).json({ message: 'No puedes bloquear tu propia cuenta' });
    }

    const usuario = await UserModel.toggleActivo(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

exports.eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (Number(id) === req.usuario.id) {
      return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta' });
    }

    await UserModel.deleteById(id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};