import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // 🛠️ Importación corregida con el nombre oficial

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));