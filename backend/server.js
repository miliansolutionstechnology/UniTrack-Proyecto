// server.js (Estructura del Backend para UniTrack)
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares globales
app.use(express.json());
app.use(cors()); // Permite que Angular (puerto 4200) hable con el Backend (puerto 3000)

// Base de datos volátil en memoria (Estructura de Árbol/Diccionario simulada)
let estudiantesDB = {
  2026010: {
    perfil: {
      carne: 2026010,
      nombreCompleto: "Juan Manuel Miller",
      correo: "jmmiller@uregional.edu.gt",
      carrera: "Ingeniería en Sistemas de Información",
      semestresAprobados: 4
    },
    pensum: [
      { codigoCurso: "C01", nombreCurso: "Análisis de Sistemas I", zona: 32, parcial1: 15, parcial2: 14, examenFinal: 18, recuperacion: null, notaTotal: 79, estado: "Aprobado" },
      { codigoCurso: "C02", nombreCurso: "Base de Datos I", zona: 28, parcial1: 12, parcial2: 11, examenFinal: 15, recuperacion: null, notaTotal: 66, estado: "Aprobado" },
      { codigoCurso: "C03", nombreCurso: "Programación Comercial", zona: 0, parcial1: 0, parcial2: 0, examenFinal: 0, recuperacion: null, notaTotal: 0, estado: "Cursando" }
    ]
  }
};

const authUsers = {
  2026010: {
    password: '123456',
    role: 'Estudiante'
  },
  2027001: {
    password: 'catedratico123',
    role: 'Catedratico'
  }
};

// ==========================================
// RUTA 1: Autenticación básica /api/auth/login
// ==========================================
app.post('/api/auth/login', (req, res) => {
  const { carne, password } = req.body;
  const parsedCarne = Number(carne);

  if (!carne || !password) {
    return res.status(400).json({ mensaje: 'Carné y contraseña son requeridos.' });
  }

  const authUser = authUsers[parsedCarne];
  if (!authUser || authUser.password !== password) {
    return res.status(401).json({ mensaje: 'Carné o contraseña incorrectos.' });
  }

  const token = Buffer.from(`${parsedCarne}:${Date.now()}`).toString('base64');
  return res.json({ token, role: authUser.role });
});

// ==========================================
// RUTA 2: Obtener el Perfil de un Alumno
// ==========================================
app.get('/api/estudiantes/:carne', (req, res) => {
  const carne = parseInt(req.params.carne);
  if (estudiantesDB[carne]) {
    res.json(estudiantesDB[carne].perfil);
  } else {
    res.status(404).json({ mensaje: "Estudiante no encontrado en el registro." });
  }
});

// ==========================================
// RUTA 2: Obtener el Pensum/Notas de un Alumno
// ==========================================
app.get('/api/estudiantes/:carne/pensum', (req, res) => {
  const carne = parseInt(req.params.carne);
  if (estudiantesDB[carne]) {
    res.json(estudiantesDB[carne].pensum);
  } else {
    res.status(404).json({ mensaje: "Historial académico no encontrado." });
  }
});

// ==========================================
// RUTA 3: Registro Inicial de Estudiante (Semilla)
// ==========================================
app.post('/api/estudiantes/registro-inicial', (req, res) => {
  const nuevoEstudiante = req.body;
  const carne = parseInt(nuevoEstudiante.carne);

  if (!estudiantesDB[carne]) {
    estudiantesDB[carne] = {
      perfil: nuevoEstudiante,
      pensum: []
    };
    return res.status(201).json({ mensaje: "Estudiante inicial creado en el sistema." });
  }
  res.json({ mensaje: "El estudiante ya existía en el registro base." });
});

// ==========================================
// RUTA 4: Permitir al Estudiante Asignarse a un Curso
// ==========================================
app.post('/api/estudiantes/:carne/asignar', (req, res) => {
  const carne = parseInt(req.params.carne);
  const { codigoCurso, nombreCurso } = req.body;

  if (!estudiantesDB[carne]) {
    return res.status(404).json({ mensaje: "Estudiante inexistente." });
  }

  // Validar si ya se encuentra cursando o aprobado el curso
  const existe = estudiantesDB[carne].pensum.find(c => c.codigoCurso === codigoCurso);
  if (existe) {
    return res.status(400).json({ mensaje: "El curso ya se encuentra registrado en tu pensum." });
  }

  const cursoNuevo = {
    codigoCurso,
    nombreCurso,
    zona: 0,
    parcial1: 0,
    parcial2: 0,
    examenFinal: 0,
    recuperacion: null,
    notaTotal: 0,
    estado: "Cursando"
  };

  estudiantesDB[carne].pensum.push(cursoNuevo);
  res.status(201).json({ mensaje: "Asignación procesada con éxito." });
});

// ==========================================
// RUTA 5: MODULO CATEDRÁTICO - Actualizar Calificaciones
// ==========================================
app.put('/api/estudiantes/:carne/cursos/:codigoCurso/notas', (req, res) => {
  const carne = parseInt(req.params.carne);
  const codigoCurso = req.params.codigoCurso;
  const { zona, parcial1, parcial2, examenFinal, recuperacion } = req.body;

  if (!estudiantesDB[carne]) {
    return res.status(404).json({ mensaje: "Estudiante no encontrado." });
  }

  let curso = estudiantesDB[carne].pensum.find(c => c.codigoCurso === codigoCurso);
  if (!curso) {
    return res.status(404).json({ mensaje: "El estudiante no tiene asignado este curso." });
  }

  // Actualizar los campos analíticos de notas
  curso.zona = parseInt(zona) || 0;
  curso.parcial1 = parseInt(parcial1) || 0;
  curso.parcial2 = parseInt(parcial2) || 0;
  curso.examenFinal = parseInt(examenFinal) || 0;
  curso.recuperacion = recuperacion !== null ? parseInt(recuperacion) : null;

  // Calcular la nota de promoción final
  let precalculo = curso.zona + curso.parcial1 + curso.parcial2 + curso.examenFinal;
  
  // Aplicar regla de examen de recuperación si aplica
  if (precalculo < 61 && curso.recuperacion !== null) {
    curso.notaTotal = curso.zona + curso.recuperacion;
  } else {
    curso.notaTotal = precalculo;
  }

  // Determinar estatus académico
  if (curso.notaTotal >= 61) {
    curso.estado = "Aprobado";
  } else {
    curso.estado = "Reprobado";
  }

  res.json({ mensaje: "Acta de calificaciones actualizada.", curso });
});

// Levantar el puerto de escucha
app.listen(PORT, () => {
  console.log(`🚀 Servidor de UniTrack corriendo en: http://localhost:${PORT}`);
});