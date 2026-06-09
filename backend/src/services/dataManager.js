const fs = require('fs');
const path = require('path');
const EstudiantesLinkedList = require('./EstudiantesLinkedList');
const { Estudiante } = require('../models/estudiante.model');

const filePath = path.join(__dirname, '../../data/estudiantes.json');
const listaEstudiantes = new EstudiantesLinkedList();

function cargarDatos() {
    try {
        if (fs.existsSync(filePath)) {
            const dataRaw = fs.readFileSync(filePath, 'utf8');
            if (dataRaw.trim() === '') return;
            const datosJSON = JSON.parse(dataRaw);
            datosJSON.forEach(est => {
                const nuevoEstudiante = new Estudiante(est.carnet, est.nombre, est.correo, est.carrera);
                // Si el JSON ya tenía inscripciones, reconstruir su lista doble
                if (est.historialInscripciones && est.historialInscripciones.cabeza) {
                    // Mapeo simple de los datos guardados planos
                    let actual = est.historialInscripciones.cabeza;
                    while(actual) {
                        nuevoEstudiante.historialInscripciones.insertarAlFinal(actual.inscripcion);
                        actual = actual.siguiente;
                    }
                }
                listaEstudiantes.insertarAlFinal(nuevoEstudiante);
            });
        }
    } catch (e) { console.error(e); }
}

function guardarDatos() {
    try {
        const arrayEstudiantes = listaEstudiantes.listarTodos();
        fs.writeFileSync(filePath, JSON.stringify(arrayEstudiantes, null, 2), 'utf8');
    } catch (e) { console.error(e); }
}

cargarDatos();
module.exports = { listaEstudiantes, guardarDatos };