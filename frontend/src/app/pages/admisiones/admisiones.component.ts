import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admisiones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admisiones.component.html',
  styleUrls: ['./admisiones.component.css'],
})
export class AdmisionesComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.pattern(/^[+0-9\s\-()]+$/)],
      carrera: [''],
      tipoSolicitud: ['', Validators.required],
      mensaje: ['', Validators.minLength(10)]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Formulario enviado:', formData);
      
      // Aquí iría la lógica para enviar el formulario al backend
      // this.apiService.sendAdmissionForm(formData).subscribe(...)
      
      // Por ahora, mostramos un mensaje de éxito
      alert(`¡Gracias ${formData.nombre}! Tu solicitud ha sido recibida. Nos contactaremos pronto.`);
      this.contactForm.reset();
    }
  }

  scrollToForm(): void {
    const formElement = document.querySelector('.contact-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}