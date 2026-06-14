// src/controllers/estudiantes.controller.js
const arbolGlobal = require('../models/arbolEstudiantes');

// ==========================================
// 🛠️ ENDPOINTS AUXILIARES DE SISTEMA
// ==========================================

// Registrar un estudiante base en el árbol (Petición Inicial)
exports.crearEstudianteBase = (req, res) => {
    const { carne, nombreCompleto, correo, carrera, fotoPerfil, semestresAprobados } = req.body;

    if (!carne || !nombreCompleto || !correo || !carrera) {
        return res.status(400).json({ error: "Faltan campos obligatorios para registrar al estudiante" });
    }

    const exito = arbolGlobal.insertar({
        carne,
        nombreCompleto,
        correo,
        carrera,
        fotoPerfil,
        semestresAprobados
    });

    if (exito) {
        res.status(201).json({ mensaje: "Estudiante insertado con éxito en el árbol binario" });
    } else {
        res.status(400).json({ error: "No se pudo insertar. El número de carné ya existe." });
    }
};

// ==========================================
// 🎓 PORTAL DEL ESTUDIANTE
// ==========================================

// GET: Obtener datos de perfil y foto
exports.obtenerPerfil = (req, res) => {
    const { carne } = req.params;
    const alumno = arbolGlobal.buscar(carne);

    if (!alumno) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res.json({
        carne: alumno.carne,
        nombreCompleto: alumno.nombreCompleto,
        correo: alumno.correo,
        carrera: alumno.carrera,
        fotoPerfil: alumno.fotoPerfil,
        semestresAprobados: alumno.semestresAprobados
    });
};

// GET: Obtener pensum / cursos asignados con desglose de notas
exports.obtenerPensumYNotas = (req, res) => {
    const { carne } = req.params;
    const alumno = arbolGlobal.buscar(carne);

    if (!alumno) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    // Convertimos el mapa de cursos internos del nodo en un arreglo para que el Frontend lo renderice fácilmente
    const listadoCursos = Object.values(alumno.cursos);
    res.json(listadoCursos);
};

// POST: Permitir al estudiante asignarse un nuevo curso vacio
exports.asignarCurso = (req, res) => {
    const { carne } = req.params;
    const { codigoCurso, nombreCurso } = req.body;

    if (!codigoCurso || !nombreCurso) {
        return res.status(400).json({ error: "Faltan datos del curso (código o nombre)" });
    }

    const alumno = arbolGlobal.buscar(carne);
    if (!alumno) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    // Validación si ya se encuentra registrado
    if (alumno.cursos[codigoCurso]) {
        return res.status(400).json({ error: "El estudiante ya tiene asignado este curso" });
    }

    // Estructura inicial del curso dentro del historial del nodo
    alumno.cursos[codigoCurso] = {
        codigoCurso: codigoCurso.toString(),
        nombreCurso,
        zona: 0,
        parcial1: 0,
        parcial2: 0,
        examenFinal: 0,
        recuperacion: 0,
        notaTotal: 0,
        estado: "Cursando"
    };

    res.json({ mensaje: "Curso asignado exitosamente", curso: alumno.cursos[codigoCurso] });
};

// ==========================================
// 👨‍🏫 PORTAL DEL CATEDRÁTICO
// ==========================================

// GET: Catedrático busca estudiante por carné en el árbol O(log n)
exports.catedraticoBuscarAlumno = (req, res) => {
    const { carne } = req.params;
    const alumno = arbolGlobal.buscar(carne);

    if (!alumno) {
        return res.status(404).json({ error: "Estudiante no registrado en el control académico" });
    }

    res.json({
        carne: alumno.carne,
        nombreCompleto: alumno.nombreCompleto,
        carrera: alumno.carrera,
        cursos: Object.values(alumno.cursos)
    });
};

// PUT: Catedrático ingresa o modifica las notas de un curso asignado
exports.actualizarNotas = (req, res) => {
    const { carne, codigoCurso, zona, parcial1, parcial2, examenFinal, recuperacion } = req.body;

    const alumno = arbolGlobal.buscar(carne);
    if (!alumno) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    const curso = alumno.cursos[codigoCurso];
    if (!curso) {
        return res.status(404).json({ error: "El estudiante no cuenta con este curso asignado" });
    }

    // parseamos los valores numéricos para evitar strings en los cálculos aritméticos
    curso.zona = parseFloat(zona) || 0;
    curso.parcial1 = parseFloat(parcial1) || 0;
    curso.parcial2 = parseFloat(parcial2) || 0;
    curso.examenFinal = parseFloat(examenFinal) || 0;
    curso.recuperacion = parseFloat(recuperacion) || 0;

    // Sumatoria de zona y evaluaciones regulares
    let notaOrdinaria = curso.zona + curso.parcial1 + curso.parcial2 + curso.examenFinal;

    // LÓGICA DE EVALUACIÓN: Nota de aprobación mínima en Guatemala = 61 pts
    if (notaOrdinaria >= 61) {
        curso.notaTotal = notaOrdinaria;
        curso.estado = "Aprobado";
    } else if (curso.recuperacion > 0) {
        // Si tiene nota de recuperación, se calcula la nota final sumando la zona con la recuperación
        let notaConRecuperacion = curso.zona + curso.parcial1 + curso.parcial2 + curso.recuperacion;
        curso.notaTotal = Math.max(notaOrdinaria, notaConRecuperacion);
        curso.estado = curso.notaTotal >= 61 ? "Aprobado" : "Reprobado";
    } else {
        curso.notaTotal = notaOrdinaria;
        curso.estado = "Reprobado";
    }

    res.json({ mensaje: "Calificaciones actualizadas exitosamente", curso });
};

// DELETE: Resetear a cero las notas de un curso asignado
exports.eliminarNotasCurso = (req, res) => {
    const { carne, codigoCurso } = req.params;
    
    const alumno = arbolGlobal.buscar(carne);
    if (!alumno || !alumno.cursos[codigoCurso]) {
        return res.status(404).json({ error: "Registro de curso o estudiante no encontrado" });
    }

    // Reestablecemos el estado básico del curso
    alumno.cursos[codigoCurso] = {
        ...alumno.cursos[codigoCurso],
        zona: 0,
        parcial1: 0,
        parcial2: 0,
        examenFinal: 0,
        recuperacion: 0,
        notaTotal: 0,
        estado: "Cursando"
    };

    res.json({ mensaje: "Notas eliminadas y reseteadas a cero para este curso" });
};