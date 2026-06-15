import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LocationCard {
  campus: string;
  address: string;
  highlight: string;
  features: string[];
}

@Component({
  selector: 'app-ubicaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent {
  cards: LocationCard[] = [
    {
      campus: 'Campus Central',
      address: 'Av. Principal 123, Ciudad Universitaria',
      highlight: 'Aulas inteligentes y laboratorios 24/7',
      features: ['Wi-Fi premium', 'Biblioteca digital', 'Cafetería gourmet']
    },
    {
      campus: 'Campus Tech',
      address: 'Calle Innovación 42, Distrito Financiero',
      highlight: 'Espacios de coworking para proyectos y startups',
      features: ['Salas de exposición', 'Zona de estudio', 'Apoyo de mentores']
    },
    {
      campus: 'Campus Verde',
      address: 'Parque Educativo 7, Sector Norte',
      highlight: 'Ambiente sereno para estudio y actividades al aire libre',
      features: ['Jardines interactivos', 'Centro deportivo', 'Rutas de movilidad']
    }
  ];
}
