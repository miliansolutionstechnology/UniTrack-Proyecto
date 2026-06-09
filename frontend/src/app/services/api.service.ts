import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/estudiantes';

  constructor(private http: HttpClient) { }

  // --- OPERACIONES DE ESTUDIANTES (LISTA SIMPLE) ---
  getEstudiantes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearEstudiante(estudiante: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, estudiante);
  }

  insertarEnPosicion(estudiante: any, posicion: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insertar-en-posicion`, { estudiante, posicion });
  }

  eliminarEstudiante(carnet: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${carnet}`);
  }

  invertirLista(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/invertir`, {});
  }

  // --- OPERACIONES DE HISTORIAL (LISTA DOBLE) ---
  getHistorial(carnet: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${carnet}/historial`);
  }

  agregarInscripcion(carnet: string, { codigoCurso, nombreCurso, semestre, nota }: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${carnet}/historial`, { codigoCurso, nombreCurso, semestre, nota });
  }

  getHistorialOrdenado(carnet: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${carnet}/historial/ordenado`);
  }

  eliminarInscripcion(carnet: string, codigoCurso: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${carnet}/historial/${codigoCurso}`);
  }
}