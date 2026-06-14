// src/app/pages/portal-estudiante/portal-estudiante.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, PerfilEstudiante, CursoEstudiante } from '../../services/data.service';

@Component({
  selector: 'app-portal-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portal-estudiante.component.html',
  styleUrls: ['./portal-estudiante.component.css']
})
export class PortalEstudianteComponent implements OnInit {
  carneUsuario: number = 2026010; // Carné por defecto de pruebas
  perfil: PerfilEstudiante | null = null;
  
  // Sincronizado con el HTML: El HTML itera sobre 'cursosAsignados'
  cursosAsignados: CursoEstudiante[] = [];
  
  // Sincronizado con el HTML: El HTML valida 'seccionActiva'
  seccionActiva: string = 'dashboard';

  // Formulario de asignación
  nuevoCurso = {
    codigoCurso: '',
    nombreCurso: ''
  };

  mensajeAlerta: string = '';
  tipoAlerta: 'success' | 'error' = 'success';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.verificarYVerEstudiante();
  }

  verificarYVerEstudiante(): void {
    this.dataService.obtenerPerfilEstudiante(this.carneUsuario).subscribe({
      next: (data) => {
        this.perfil = data;
        this.cargarNotasEHistorial();
      },
      error: (err: any) => {
        console.log('Estudiante no encontrado, insertando datos semilla...');
        this.inyectarEstudianteSemilla();
      }
    });
  }

  inyectarEstudianteSemilla(): void {
    const estudianteSemilla: PerfilEstudiante = {
      carne: this.carneUsuario,
      nombreCompleto: 'Estudiante de Ingeniería de Prueba',
      correo: 'estudiante@universidad.edu.gt',
      carrera: 'Ingeniería en Sistemas de Información',
      semestresAprobados: 4
    };

    this.dataService.registrarEstudianteBase(estudianteSemilla).subscribe({
      next: () => {
        this.perfil = estudianteSemilla;
        this.cargarNotasEHistorial();
      },
      error: (err: any) => this.mostrarAlerta('No se pudo inicializar el entorno de desarrollo local.', 'error')
    });
  }

  cargarNotasEHistorial(): void {
    this.dataService.obtenerPensumEstudiante(this.carneUsuario).subscribe({
      next: (data) => {
        this.cursosAsignados = data;
      },
      error: (err: any) => console.error('Error al traer el historial académico', err)
    });
  }

  // Sincronizado con el HTML: Función para ejecutar el formulario
  ejecutarAsignacion(): void {
    if (!this.nuevoCurso.codigoCurso || !this.nuevoCurso.nombreCurso) {
      this.mostrarAlerta('Todos los campos del curso son obligatorios.', 'error');
      return;
    }

    // Corregido: Llamando al servicio con el nombre correcto sin la doble 's'
    this.dataService.asignarCursoEstudiante(this.carneUsuario, this.nuevoCurso).subscribe({
      next: () => {
        this.mostrarAlerta(`Te has asignado exitosamente al curso: ${this.nuevoCurso.nombreCurso}`, 'success');
        this.nuevoCurso = { codigoCurso: '', nombreCurso: '' };
        this.cargarNotasEHistorial();
        this.cambiarSeccion('dashboard');
      },
      error: (err: any) => {
        this.mostrarAlerta('Error al procesar la asignación en Control Académico.', 'error');
      }
    });
  }

  // Sincronizado con el HTML: El menú lateral interactúa con esta función
  cambiarSeccion(seccion: string): void {
    this.seccionActiva = seccion;
  }

  mostrarAlerta(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensajeAlerta = mensaje;
    this.tipoAlerta = tipo;
    setTimeout(() => this.mensajeAlerta = '', 4000);
  }
}