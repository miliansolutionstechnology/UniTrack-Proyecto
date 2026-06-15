import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface AdmissionStep {
  number: number;
  title: string;
  description: string;
  active: boolean;
}

@Component({
  selector: 'app-admisiones',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admisiones.component.html',
  styleUrls: ['./admisiones.component.css']
})
export class AdmisionesComponent {
  steps: AdmissionStep[] = [
    {
      number: 1,
      title: 'Requisitos de Admisión',
      description: 'Documentos, promedio y fechas clave para postular a tu programa.',
      active: true
    },
    {
      number: 2,
      title: 'Examen de Ubicación',
      description: 'Conoce el examen de ubicación, su propósito y cómo prepararte.',
      active: false
    },
    {
      number: 3,
      title: 'Proceso de Inscripción',
      description: 'Matrícula, pago y registro de materias en un solo flujo sencillo.',
      active: false
    }
  ];

  selectStep(index: number) {
    this.steps = this.steps.map((step, idx) => ({ ...step, active: idx === index }));
  }
}
