import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admisiones-proceso-inscripcion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './proceso-inscripcion.component.html',
  styleUrls: ['./proceso-inscripcion.component.css']
})
export class ProcesoInscripcionComponent {}
