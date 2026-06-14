// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PerfilEstudiante {
  carne: number;
  nombreCompleto: string;
  correo: string;
  carrera: string;
  semestresAprobados: number;
}

export interface CursoEstudiante {
  codigoCurso: string;
  nombreCurso: string;
  zona: number;
  parcial1: number;
  parcial2: number;
  examenFinal: number;
  recuperacion: number | null;
  notaTotal: number;
  estado: 'Aprobado' | 'Reprobado' | 'Cursando';
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Carga el perfil del estudiante desde el backend por su carné
   */
  obtenerPerfilEstudiante(carne: number): Observable<PerfilEstudiante> {
    return this.http.get<PerfilEstudiante>(`${this.apiUrl}/estudiantes/${carne}`);
  }

  /**
   * Carga el historial de cursos, notas y estado académico
   */
  obtenerPensumEstudiante(carne: number): Observable<CursoEstudiante[]> {
    return this.http.get<CursoEstudiante[]>(`${this.apiUrl}/estudiantes/${carne}/pensum`);
  }

  /**
   * Registra un estudiante inicial si no existe en la base de datos (Semilla)
   */
  registrarEstudianteBase(estudiante: PerfilEstudiante): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/estudiantes/registro-inicial`, estudiante);
  }

  /**
   * Permite al alumno asignarse a un curso del pensum vigente
   */
  asignarCursoEstudiante(carne: number, curso: { codigoCurso: string; nombreCurso: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/estudiantes/${carne}/asignar`, curso);
  }

  /**
   * Módulo Catedrático: Modifica el desglose analítico de calificaciones
   */
  actualizarNotasCurso(
    carne: number, 
    codigoCurso: string, 
    notas: {
      zona: number;
      parcial1: number;
      parcial2: number;
      examenFinal: number;
      recuperacion: number;
    }
  ): Observable<any> {
    const url = `${this.apiUrl}/estudiantes/${carne}/cursos/${codigoCurso}/notas`;
    return this.http.put<any>(url, notas);
  }
}