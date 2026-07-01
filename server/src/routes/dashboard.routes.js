const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const controller = require('../controllers/dashboard.controller');

// Middleware simple para permitir solo admins
function soloAdmin(req, res, next) {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }
  next();
}

router.get('/estadisticas', verifyToken, soloAdmin, controller.obtenerEstadisticas);
router.get('/recientes', verifyToken, soloAdmin, controller.obtenerRecientes);

module.exports = router;