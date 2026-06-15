import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admisiones-reingreso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reingreso.component.html',
  styleUrls: ['./reingreso.component.css']
})
export class ReingresoComponent {}
