import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, PerfilEstudiante, CursoEstudiante } from '../../services/data.service';

@Component({
  selector: 'app-portal-catedratico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portal-catedratico.component.html',
  styleUrls: [
    '../portal-estudiante/portal-estudiante.component.css',
    './portal-catedratico.component.css'
  ]
})
export class PortalCatedraticoComponent {
  carneBusqueda: number | null = null;
  estudianteSeleccionado: PerfilEstudiante | null = null;
  cursosEstudiante: CursoEstudiante[] = [];

  editando: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: 'success' | 'error' = 'success';

  notaForm = {
    codigoCurso: '',
    zona: 0,
    parcial1: 0,
    parcial2: 0,
    examenFinal: 0,
    recuperacion: null as number | null
  };

  constructor(private dataService: DataService) {}

  buscarEstudiante(): void {
    if (!this.carneBusqueda) {
      this.mostrarAlerta('Por favor ingresa un número de carné válido.', 'error');
      return;
    }

    this.dataService.obtenerPerfilEstudiante(this.carneBusqueda).subscribe({
      next: (estudiante) => {
        this.estudianteSeleccionado = estudiante;
        this.cargarCursosEstudiante();
        this.mostrarAlerta(`Expediente de ${estudiante.nombreCompleto} cargado con éxito.`, 'success');
      },
      error: () => {
        this.estudianteSeleccionado = null;
        this.cursosEstudiante = [];
        this.mostrarAlerta('Estudiante no encontrado en el árbol de registros.', 'error');
      }
    });
  }

  cargarCursosEstudiante(): void {
    if (!this.estudianteSeleccionado) return;
    
    this.dataService.obtenerPensumEstudiante(this.estudianteSeleccionado.carne).subscribe({
      next: (cursos) => {
        this.cursosEstudiante = cursos;
      },
      error: (err) => {
        console.error('Error al recuperar pensum:', err);
      }
    });
  }

  guardarCalificacion(): void {
    if (!this.estudianteSeleccionado || !this.notaForm.codigoCurso) {
      this.mostrarAlerta('Selecciona un curso válido para procesar las calificaciones.', 'error');
      return;
    }

    if (this.notaForm.zona > 40 || this.notaForm.parcial1 > 20 || this.notaForm.parcial2 > 20 || this.notaForm.examenFinal > 20) {
      this.mostrarAlerta('Revisa los límites de los campos (Zona: 40, Parciales/Final: 20).', 'error');
      return;
    }

    const payload = {
      zona: this.notaForm.zona,
      parcial1: this.notaForm.parcial1,
      parcial2: this.notaForm.parcial2,
      examenFinal: this.notaForm.examenFinal,
      recuperacion: this.notaForm.recuperacion || 0
    };

    this.dataService.actualizarNotasCurso(this.estudianteSeleccionado.carne, this.notaForm.codigoCurso, payload).subscribe({
      next: () => {
        this.mostrarAlerta('Calificaciones actualizadas correctamente en el acta.', 'success');
        this.cancelarEdicion();
        this.cargarCursosEstudiante();
      },
      error: () => {
        this.mostrarAlerta('Error al guardar las notas en el servidor.', 'error');
      }
    });
  }

  cargarParaEditar(curso: CursoEstudiante): void {
    this.editando = true;
    this.notaForm = {
      codigoCurso: curso.codigoCurso,
      zona: curso.zona,
      parcial1: curso.parcial1,
      parcial2: curso.parcial2,
      examenFinal: curso.examenFinal,
      recuperacion: curso.recuperacion || null
    };
  }

  eliminarNotasCurso(codigoCurso: string): void {
    if (!this.estudianteSeleccionado) return;
    
    if (confirm('¿Estás seguro de que deseas resetear a 0 las notas de este curso?')) {
      const payloadCero = { zona: 0, parcial1: 0, parcial2: 0, examenFinal: 0, recuperacion: 0 };
      
      this.dataService.actualizarNotasCurso(this.estudianteSeleccionado.carne, codigoCurso, payloadCero).subscribe({
        next: () => {
          this.mostrarAlerta('Notas removidas del registro académico.', 'success');
          this.cargarCursosEstudiante();
        },
        error: () => this.mostrarAlerta('Error al limpiar el registro.', 'error')
      });
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.notaForm = { codigoCurso: '', zona: 0, parcial1: 0, parcial2: 0, examenFinal: 0, recuperacion: null };
  }

  mostrarAlerta(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensajeAlerta = mensaje;
    this.tipoAlerta = tipo;
    setTimeout(() => this.mensajeAlerta = '', 4000);
  }
}