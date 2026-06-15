export interface Ubicacion {
  departamento: string;
  nombreSede: string;
  direccion: string;
  coordenadas: string;
}

export const UBICACIONES: Ubicacion[] = [
  {
    departamento: 'Guatemala',
    nombreSede: 'Campus Central Guatemala',
    direccion: 'Calzada Roosevelt 13-00, Zona 11, Ciudad de Guatemala',
    coordenadas: '14.6197,-90.5290'
  },
  {
    departamento: 'Sacatepéquez',
    nombreSede: 'Sede Antigua Guatemala',
    direccion: 'Calle del Arco 5-15, Antigua Guatemala',
    coordenadas: '14.5597,-90.7331'
  },
  {
    departamento: 'Escuintla',
    nombreSede: 'Sede Pacífico',
    direccion: 'Km 68 Carretera a Puerto San José, Escuintla',
    coordenadas: '13.3032,-90.7840'
  },
  {
    departamento: 'Quetzaltenango',
    nombreSede: 'Sede Occidente',
    direccion: '5a Avenida 3-45, Zona 1, Quetzaltenango',
    coordenadas: '14.8475,-91.5228'
  },
  {
    departamento: 'Alta Verapaz',
    nombreSede: 'Sede Cobán',
    direccion: 'Boulevard San Cristóbal 6-69, Cobán',
    coordenadas: '15.4695,-90.3847'
  }
];
