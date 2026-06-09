const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/estudiantes.controller');

router.get('/', ctrl.obtenerEstudiantes);
router.get('/:carnet', ctrl.buscarEstudiante);
router.post('/', ctrl.crearEstudiante);
router.post('/insertar-en-posicion', ctrl.insertarEnPosicion);
router.post('/invertir', ctrl.invertirLista);
router.delete('/:carnet', ctrl.eliminarEstudiante);

router.get('/:carnet/historial', ctrl.obtenerHistorial);
router.post('/:carnet/historial', ctrl.agregarInscripcion);
router.get('/:carnet/historial/ordenado', ctrl.obtenerHistorialOrdenado);
router.delete('/:carnet/historial/:codigoCurso', ctrl.eliminarInscripcion);

module.exports = router;