const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const verifyToken = require('../middlewares/auth.middleware');
const controller = require('../controllers/reportes.controller');

router.post('/', verifyToken, upload.single('imagen'), controller.crearReporte);
router.get('/', verifyToken, controller.listarReportes);
router.get('/mis-reportes', verifyToken, controller.misReportes);
router.get('/notificaciones', verifyToken, controller.notificaciones);
router.patch('/:id/estado', verifyToken, controller.actualizarEstado);
router.patch('/:id/entrega', verifyToken, controller.registrarEntrega);
router.get('/historial', verifyToken, controller.historial);

module.exports = router;