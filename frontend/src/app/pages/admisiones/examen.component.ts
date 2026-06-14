import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admisiones-examen',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent {}
