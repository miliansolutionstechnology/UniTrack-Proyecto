class Inscripcion {
    constructor(codigoCurso, nombreCurso, semestre, nota) {
        this.codigoCurso = codigoCurso;
        this.nombreCurso = nombreCurso;
        this.semestre = parseInt(semestre);
        this.nota = parseFloat(nota);
    }
}

class NodoInscripcion {
    constructor(inscripcion) {
        this.inscripcion = inscripcion;
        this.siguiente = null;
        this.anterior = null; // Enlace hacia atrás
    }
}

module.exports = { Inscripcion, NodoInscripcion };