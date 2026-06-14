import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admisiones-traslado',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './traslado.component.html',
  styleUrls: ['./traslado.component.css']
})
export class TrasladoComponent {}
