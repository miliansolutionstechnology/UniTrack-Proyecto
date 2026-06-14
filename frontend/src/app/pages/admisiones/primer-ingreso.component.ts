import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admisiones-primer-ingreso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './primer-ingreso.component.html',
  styleUrls: ['./primer-ingreso.component.css']
})
export class PrimerIngresoComponent {}
