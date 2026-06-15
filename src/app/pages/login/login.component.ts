import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      carne: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get carne() {
    return this.loginForm.get('carne');
  }

  get password() {
    return this.loginForm.get('password');
  }

  private redirectByRole(role: string): void {
    const normalizedRole = role?.toLowerCase();

    if (normalizedRole.includes('catedratico') || normalizedRole.includes('docente')) {
      this.router.navigate(['/portal-catedratico']);
      return;
    }

    this.router.navigate(['/portal-estudiante']);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { carne, password } = this.loginForm.value as { carne: string; password: string };

    this.authService.login({ carne: carne ?? '', password: password ?? '' }).subscribe({
      next: (response: AuthResponse) => {
        this.loading = false;
        this.redirectByRole(response.role ?? this.authService.getRole() ?? 'estudiante');
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error?.error?.message || 'Credenciales incorrectas. Intenta de nuevo.';
      }
    });
  }
}
