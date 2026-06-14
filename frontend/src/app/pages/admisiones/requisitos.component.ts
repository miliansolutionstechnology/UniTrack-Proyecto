import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admisiones-requisitos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.css']
})
export class RequisitosComponent {}
