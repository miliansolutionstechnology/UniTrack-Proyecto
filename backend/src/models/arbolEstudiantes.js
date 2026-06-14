// src/models/arbolEstudiantes.js

class NodoEstudiante {
    constructor(estudiante) {
        this.carne = parseInt(estudiante.carne);
        this.nombreCompleto = estudiante.nombreCompleto;
        this.correo = estudiante.correo;
        this.carrera = estudiante.carrera;
        this.fotoPerfil = estudiante.fotoPerfil || ""; // Recibe string en formato Base64 para la imagen
        this.semestresAprobados = parseInt(estudiante.semestresAprobados) || 0;
        
        // Historial académico indexado por el código del curso
        // Cada curso guardará: { codigoCurso, nombreCurso, zona, parcial1, parcial2, examenFinal, recuperacion, notaTotal, estado }
        this.cursos = {}; 
        
        // Punteros del Árbol Binario
        this.izquierdo = null;
        this.derecho = null;
    }
}

class ArbolEstudiantes {
    constructor() {
        this.raiz = null;
    }

    // Método público para insertar
    insertar(estudiante) {
        const nuevoNodo = new NodoEstudiante(estudiante);
        if (this.raiz === null) {
            this.raiz = nuevoNodo;
            return true;
        } else {
            return this._insertarNodo(this.raiz, nuevoNodo);
        }
    }

    // Método recursivo privado para posicionar el nodo según el número de carné
    _insertarNodo(nodoActual, nuevoNodo) {
        if (nuevoNodo.carne < nodoActual.carne) {
            if (nodoActual.izquierdo === null) {
                nodoActual.izquierdo = nuevoNodo;
                return true;
            } else {
                return this._insertarNodo(nodoActual.izquierdo, nuevoNodo);
            }
        } else if (nuevoNodo.carne > nodoActual.carne) {
            if (nodoActual.derecho === null) {
                nodoActual.derecho = nuevoNodo;
                return true;
            } else {
                return this._insertarNodo(nodoActual.derecho, nuevoNodo);
            }
        }
        return false; // Error: El carné ya existe en el árbol
    }

    // Método para buscar un estudiante por carné O(log n)
    buscar(carne) {
        return this._buscarNodo(this.raiz, parseInt(carne));
    }

    _buscarNodo(nodoActual, carne) {
        if (nodoActual === null) return null; // No se encontró
        if (carne < nodoActual.carne) return this._buscarNodo(nodoActual.izquierdo, carne);
        if (carne > nodoActual.carne) return this._buscarNodo(nodoActual.derecho, carne);
        return nodoActual; // Nodo encontrado con éxito
    }
}

// Exportamos una única instancia global para que los datos persistan en memoria mientras el servidor esté corriendo
const arbolGlobal = new ArbolEstudiantes();
module.exports = arbolGlobal;