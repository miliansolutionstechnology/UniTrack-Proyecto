const { NodoEstudiante } = require('../models/estudiante.model');

class EstudiantesLinkedList {
    constructor() {
        this.cabeza = null;
        this._tamaño = 0;
    }

    insertarAlFinal(estudiante) {
        const nuevoNodo = new NodoEstudiante(estudiante);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
        this._tamaño++;
    }

    insertarEnPosicion(estudiante, indice) {
        if (indice < 0 || indice > this._tamaño) return false;
        if (indice === 0) {
            const nuevoNodo = new NodoEstudiante(estudiante);
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza = nuevoNodo;
            this._tamaño++;
            return true;
        }
        const nuevoNodo = new NodoEstudiante(estudiante);
        let actual = this.cabeza;
        let anterior = null;
        let contador = 0;
        while (contador < indice) {
            anterior = actual;
            actual = actual.siguiente;
            contador++;
        }
        nuevoNodo.siguiente = actual;
        anterior.siguiente = nuevoNodo;
        this._tamaño++;
        return true;
    }

    eliminarPorCarnet(carnet) {
        if (!this.cabeza) return null;
        if (this.cabeza.estudiante.carnet === carnet) {
            const eliminado = this.cabeza.estudiante;
            this.cabeza = this.cabeza.siguiente;
            this._tamaño--;
            return eliminado;
        }
        let actual = this.cabeza;
        let anterior = null;
        while (actual !== null && actual.estudiante.carnet !== carnet) {
            anterior = actual;
            actual = actual.siguiente;
        }
        if (actual !== null) {
            anterior.siguiente = actual.siguiente;
            this._tamaño--;
            return actual.estudiante;
        }
        return null;
    }

    buscarPorCarnet(carnet) {
        let actual = this.cabeza;
        while (actual !== null) {
            if (actual.estudiante.carnet === carnet) {
                return actual.estudiante;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    listarTodos() {
        const listaSencilla = [];
        let actual = this.cabeza;
        while (actual !== null) {
            listaSencilla.push(actual.estudiante);
            actual = actual.siguiente;
        }
        return listaSencilla; 
    }

    tamaño() { return this._tamaño; }

    invertir() {
        if (!this.cabeza || !this.cabeza.siguiente) return;
        let anterior = null;
        let actual = this.cabeza;
        let siguiente = null;
        while (actual !== null) {
            siguiente = actual.siguiente;
            actual.siguiente = anterior;
            anterior = actual;
            actual = siguiente;
        }
        this.cabeza = anterior;
    }
}

module.exports = EstudiantesLinkedList;