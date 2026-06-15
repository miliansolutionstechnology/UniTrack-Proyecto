import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FACULTADES } from '../../data/facultades';
import { UBICACIONES } from '../../data/ubicaciones';
import { SupabaseService } from '../../services/supabase.service';
import { ToastService } from '../../shared/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [SupabaseService],
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    nombres: ['', [Validators.required, Validators.minLength(2)]],
    apellidos: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.pattern('^[0-9+\-()\\s]{7,20}$')]],
    facultad: ['', [Validators.required]],
    carrera: ['', [Validators.required]],
    sede: ['', [Validators.required]],
    jornada: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')]]
  });

  facultades = FACULTADES;
  ubicaciones = UBICACIONES;
  jornadas = ['Diurna', 'Vespertina', 'Nocturna', 'Fin de semana'];

  carrerasOpcionales = [] as any[];
  sedesOpcionales = [] as any[];

  loading = false;

  mensaje: string | null = null;
  private supa = inject(SupabaseService);
  private toast = inject(ToastService);
  private auth = inject(AuthService);

  constructor() {
    // watch facultad changes
    this.form.get('facultad')?.valueChanges.subscribe((val) => this.onFacultadChange(val));
  }

  onFacultadChange(tagOrName: string | null) {
    if (!tagOrName) {
      this.carrerasOpcionales = [];
      return;
    }

    const fac = this.facultades.find(f => f.nombre === tagOrName || f.tag === tagOrName);
    this.carrerasOpcionales = fac ? fac.carreras : [];
  }

  onRegistrar() {
    if (this.form.invalid) {
      this.toast.showError('Revisa los campos: hay información inválida.');
      return;
    }
    this.loading = true;
    const data = this.form.value as Record<string, string | null>;

    const profile = {
      nombres: data['nombres'] ?? '',
      apellidos: data['apellidos'] ?? '',
      correo: data['correo'] ?? '',
      telefono: data['telefono'] ?? '',
      facultad: data['facultad'] ?? '',
      carrera: data['carrera'] ?? '',
      sede: data['sede'] ?? '',
      jornada: data['jornada'] ?? '',
      created_at: new Date().toISOString()
    };

    // Call backend endpoint to register student (creates auth user, inserts and sends welcome email)
    fetch('/api/register-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, password: data['password'] })
    })
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) throw json;
        return json;
      })
      .then((json) => {
        // if backend returned a session token, set it locally using AuthService
        if (json.session && json.session.access_token) {
          this.auth.setToken(json.session.access_token);
          this.auth.setRole('Estudiante');
        }
        this.toast.showSuccess('Registro completado. Bienvenido.');
        setTimeout(() => this.router.navigate(['/portal-estudiante']), 900);
      })
      .catch((err) => {
        console.error('Registro error', err);
        this.toast.showError('Error al registrar: ' + (err?.message || JSON.stringify(err)));
      })
      .finally(() => this.loading = false);
  }
}
