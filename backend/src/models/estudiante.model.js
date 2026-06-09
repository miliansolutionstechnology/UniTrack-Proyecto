const HistorialInscripcionesDLL = require('../services/HistorialInscripcionesDLL');

class Estudiante {
    constructor(carnet, nombre, correo, carrera) {
        this.carnet = carnet;
        this.nombre = nombre;
        this.correo = correo;
        this.carrera = carrera;
        // Cada estudiante maneja su propia lista doblemente enlazada de inscripciones
        this.historialInscripciones = new HistorialInscripcionesDLL(); 
    }
}

class NodoEstudiante {
    constructor(estudiante) {
        this.estudiante = estudiante;
        this.siguiente = null;
    }
}

module.exports = { Estudiante, NodoEstudiante };