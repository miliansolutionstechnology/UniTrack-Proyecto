import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html', // 🛠️ Ruta corregida y estándar
  styleUrls: ['./app.component.css']   // 🛠️ Ruta corregida y estándar
})
export class AppComponent implements OnInit {
  estudiantesList: any[] = [];
  historialList: any[] = [];
  estudianteSeleccionado: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.apiService.getEstudiantes().subscribe({
      next: (data) => this.estudiantesList = data,
      error: (err) => console.error('Error al traer estudiantes:', err)
    });
  }

  registrarAlFinal(carnet: string, nombre: string, correo: string, carrera: string) {
    if (!carnet || !nombre) return alert('Carnet y Nombre son obligatorios');
    const nuevo = { carnet, nombre, correo, carrera };
    
    this.apiService.crearEstudiante(nuevo).subscribe({
      next: () => {
        this.cargarEstudiantes();
        alert('Estudiante añadido a la Lista Simple (Final)');
      },
      error: (err) => alert(err.error.mensaje || 'Error')
    });
  }

  invertir() {
    this.apiService.invertirLista().subscribe({
      next: () => {
        this.cargarEstudiantes();
        if (this.estudianteSeleccionado) this.seleccionarEstudiante(this.estudianteSeleccionado);
      }
    });
  }

  seleccionarEstudiante(estudiante: any) {
    this.estudianteSeleccionado = estudiante;
    this.apiService.getHistorial(estudiante.carnet).subscribe({
      next: (data) => this.historialList = data
    });
  }

  agregarCurso(codigo: string, nombre: string, semestre: string, nota: string) {
    if (!this.estudianteSeleccionado) return;
    const { carnet } = this.estudianteSeleccionado;
    const { codigoCurso, nombreCurso } = { codigoCurso: codigo, nombreCurso: nombre };
    const inscripcion = { codigoCurso, nombreCurso, semestre, nota };

    this.apiService.agregarInscripcion(carnet, inscripcion).subscribe({
      next: (data) => this.historialList = data
    });
  }

  ordenarHistorial() {
    if (!this.estudianteSeleccionado) return;
    this.apiService.getHistorialOrdenado(this.estudianteSeleccionado.carnet).subscribe({
      next: (data) => this.historialList = data
    });
  }
}