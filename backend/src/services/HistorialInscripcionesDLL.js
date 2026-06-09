const { NodoInscripcion } = require('../models/inscripcion.model');

class HistorialInscripcionesDLL {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this._tamaño = 0;
    }

    insertarAlFinal(inscripcion) {
        const nuevoNodo = new NodoInscripcion(inscripcion);
        if (!this.cola) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else {
            this.cola.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.cola;
            this.cola = nuevoNodo;
        }
        this._tamaño++;
    }

    eliminarPorCodigoCurso(codigo) {
        if (!this.cabeza) return null;
        let actual = this.cabeza;
        while (actual !== null && actual.inscripcion.codigoCurso !== codigo) {
            actual = actual.siguiente;
        }
        if (actual === null) return null;

        if (actual === this.cabeza && actual === this.cola) {
            this.cabeza = null;
            this.cola = null;
        } else if (actual === this.cabeza) {
            this.cabeza = this.cabeza.siguiente;
            this.cabeza.anterior = null;
        } else if (actual === this.cola) {
            this.cola = this.cola.anterior;
            this.cola.siguiente = null;
        } else {
            actual.anterior.siguiente = actual.siguiente;
            actual.siguiente.anterior = actual.anterior;
        }
        this._tamaño--;
        return actual.inscripcion;
    }

    recorrerAdelante() {
        const lista = [];
        let actual = this.cabeza;
        while (actual !== null) {
            lista.push(actual.inscripcion);
            actual = actual.siguiente;
        }
        return lista;
    }

    ordenarPorNota() {
        if (!this.cabeza || !this.cabeza.siguiente) return;
        let actual = this.cabeza.siguiente;
        while (actual !== null) {
            let llave = actual.inscripcion;
            let p = actual.anterior;
            while (p !== null && p.inscripcion.nota < llave.nota) {
                p.siguiente.inscripcion = p.inscripcion;
                p = p.anterior;
            }
            if (p === null) {
                this.cabeza.inscripcion = llave;
            } else {
                p.siguiente.inscripcion = llave;
            }
            actual = actual.siguiente;
        }
    }
}

module.exports = HistorialInscripcionesDLL;