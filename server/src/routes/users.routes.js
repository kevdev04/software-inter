const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const controller = require('../controllers/users.controller');

function soloAdmin(req, res, next) {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }
  next();
}

router.get('/', verifyToken, soloAdmin, controller.listarUsuarios);
router.patch('/:id/toggle-activo', verifyToken, soloAdmin, controller.toggleActivo);
router.delete('/:id', verifyToken, soloAdmin, controller.eliminarUsuario);

module.exports = router;