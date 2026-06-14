// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'UniTrack Pro - Inicio'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'UniTrack Pro - Login'
  },
  {
    path: 'portal-estudiante',
    loadComponent: () => import('./pages/portal-estudiante/portal-estudiante.component').then(m => m.PortalEstudianteComponent),
    canActivate: [AuthGuard],
    title: 'UniTrack Pro - Portal Estudiante'
  },
  {
    path: 'portal-catedratico',
    loadComponent: () => import('./pages/portal-catedratico/portal-catedratico.component').then(m => m.PortalCatedraticoComponent),
    canActivate: [AuthGuard],
    title: 'UniTrack Pro - Panel Catedrático'
  },
  {
    path: 'admisiones',
    loadComponent: () => import('./pages/admisiones/admisiones.component').then(m => m.AdmisionesComponent),
    title: 'UniTrack Pro - Admisiones'
  },
  {
    path: 'admisiones/requisitos',
    loadComponent: () => import('./pages/admisiones/requisitos.component').then(m => m.RequisitosComponent),
    title: 'UniTrack Pro - Requisitos de Admisión'
  },
  {
    path: 'admisiones/examen',
    loadComponent: () => import('./pages/admisiones/examen.component').then(m => m.ExamenComponent),
    title: 'UniTrack Pro - Examen de Ubicación'
  },
  {
    path: 'admisiones/proceso-inscripcion',
    loadComponent: () => import('./pages/admisiones/proceso-inscripcion.component').then(m => m.ProcesoInscripcionComponent),
    title: 'UniTrack Pro - Proceso de Inscripción'
  },
  {
    path: 'admisiones/primer-ingreso',
    loadComponent: () => import('./pages/admisiones/primer-ingreso.component').then(m => m.PrimerIngresoComponent),
    title: 'UniTrack Pro - Primer Ingreso'
  },
  {
    path: 'admisiones/reingreso',
    loadComponent: () => import('./pages/admisiones/reingreso.component').then(m => m.ReingresoComponent),
    title: 'UniTrack Pro - Re-Ingreso'
  },
  {
    path: 'admisiones/traslado',
    loadComponent: () => import('./pages/admisiones/traslado.component').then(m => m.TrasladoComponent),
    title: 'UniTrack Pro - Traslado'
  },
  {
    path: 'ubicaciones',
    loadComponent: () => import('./components/ubicaciones/ubicaciones.component').then(m => m.UbicacionesComponent),
    title: 'UniTrack Pro - Ubicaciones'
  },
  {
    path: 'registro',
    loadComponent: () => import('./components/registro-estudiante/registro-estudiante.component').then(m => m.RegistroEstudianteComponent),
    title: 'UniTrack Pro - Registro Estudiante'
  },
  {
    path: '**',
    redirectTo: ''
  }
];