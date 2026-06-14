// src/routes/estudiantes.routes.js
const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantes.controller');

// ==========================================
// 🛠️ RUTA DE CONFIGURACIÓN / TEST
// ==========================================
// Permite insertar estudiantes iniciales en el árbol para hacer pruebas
router.post('/registro-base', estudiantesController.crearEstudianteBase);

// ==========================================
// 🎓 PORTAL DEL ESTUDIANTE
// ==========================================
// Obtener la información del perfil del alumno (datos personales y foto)
router.get('/estudiantes/:carne/perfil', estudiantesController.obtenerPerfil);

// Obtener el pensum con el desglose detallado de notas y estados de sus cursos
router.get('/estudiantes/:carne/pensum', estudiantesController.obtenerPensumYNotas);

// Permitir que el estudiante se asigne un nuevo curso vacio en su periodo actual
router.post('/estudiantes/:carne/asignar', estudiantesController.asignarCurso);

// ==========================================
// 👨‍🏫 PORTAL DEL CATEDRÁTICO
// ==========================================
// Buscar a un alumno por carné de forma rápida O(log n) en el árbol
router.get('/catedratico/buscar/:carne', estudiantesController.catedraticoBuscarAlumno);

// Registrar, modificar o calcular la nota final del curso (zona, parciales, final, recu)
router.put('/catedratico/notas', estudiantesController.actualizarNotas);

// Resetear o eliminar las notas de un curso específico de un alumno
router.delete('/catedratico/eliminar-nota/:carne/:codigoCurso', estudiantesController.eliminarNotasCurso);

module.exports = router;