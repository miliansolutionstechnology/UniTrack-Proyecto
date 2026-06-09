const { listaEstudiantes, guardarDatos } = require('../services/dataManager');
const { Estudiante } = require('../models/estudiante.model');
const { Inscripcion } = require('../models/inscripcion.model');

exports.obtenerEstudiantes = (req, res) => res.status(200).json(listaEstudiantes.listarTodos());

exports.buscarEstudiante = (req, res) => {
    const est = listaEstudiantes.buscarPorCarnet(req.params.carnet);
    return est ? res.status(200).json(est) : res.status(404).json({ mensaje: "No encontrado" });
};

exports.crearEstudiante = (req, res) => {
    const { carnet, nombre, correo, carrera } = req.body;
    if (listaEstudiantes.buscarPorCarnet(carnet)) return res.status(409).json({ mensaje: "Ya existe" });
    const nuevo = new Estudiante(carnet, nombre, correo, carrera);
    listaEstudiantes.insertarAlFinal(nuevo);
    guardarDatos();
    return res.status(201).json(nuevo);
};

exports.insertarEnPosicion = (req, res) => {
    const { estudiante, posicion } = req.body;
    const nuevo = new Estudiante(estudiante.carnet, estudiante.nombre, estudiante.correo, estudiante.carrera);
    const exito = listaEstudiantes.insertarEnPosicion(nuevo, parseInt(posicion));
    if (!exito) return res.status(400).json({ mensaje: "Posición inválida" });
    guardarDatos();
    return res.status(201).json({ mensaje: "Insertado" });
};

exports.invertirLista = (req, res) => {
    listaEstudiantes.invertir();
    guardarDatos();
    res.status(200).json({ mensaje: "Lista Invertida" });
};

exports.eliminarEstudiante = (req, res) => {
    const el = listaEstudiantes.eliminarPorCarnet(req.params.carnet);
    if (!el) return res.status(404).json({ mensaje: "No existe" });
    guardarDatos();
    return res.status(200).json(el);
};

exports.obtenerHistorial = (req, res) => {
    const est = listaEstudiantes.buscarPorCarnet(req.params.carnet);
    return est ? res.status(200).json(est.historialInscripciones.recorrerAdelante()) : res.status(404).json({ mensaje: "No encontrado" });
};

exports.agregarInscripcion = (req, res) => {
    const est = listaEstudiantes.buscarPorCarnet(req.params.carnet);
    if (!est) return res.status(404).json({ mensaje: "No encontrado" });
    const { codigoCurso, nombreCurso, semestre, nota } = req.body;
    est.historialInscripciones.insertarAlFinal(new Inscripcion(codigoCurso, nombreCurso, semestre, nota));
    guardarDatos();
    return res.status(201).json(est.historialInscripciones.recorrerAdelante());
};

exports.obtenerHistorialOrdenado = (req, res) => {
    const est = listaEstudiantes.buscarPorCarnet(req.params.carnet);
    if (!est) return res.status(404).json({ mensaje: "No encontrado" });
    est.historialInscripciones.ordenarPorNota();
    return res.status(200).json(est.historialInscripciones.recorrerAdelante());
};

exports.eliminarInscripcion = (req, res) => {
    const est = listaEstudiantes.buscarPorCarnet(req.params.carnet);
    if (!est) return res.status(404).json({ mensaje: "No encontrado" });
    const del = est.historialInscripciones.eliminarPorCodigoCurso(req.params.codigoCurso);
    if (!del) return res.status(404).json({ mensaje: "Curso no encontrado" });
    guardarDatos();
    return res.status(200).json(del);
};