// src/main.ts
import 'zone.js'; // Mantiene la corrección del error de ciclo NG0908
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // <- CORREGIDO: 'AppComponent' con A mayúscula
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig) // <- CORREGIDO: 'AppComponent' con A mayúscula
  .catch((err) => console.error(err));