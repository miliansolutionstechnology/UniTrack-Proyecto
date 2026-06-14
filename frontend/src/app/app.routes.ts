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
    loadComponent: () => import('./components/admisiones/admisiones.component').then(m => m.AdmisionesComponent),
    title: 'UniTrack Pro - Admisiones'
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