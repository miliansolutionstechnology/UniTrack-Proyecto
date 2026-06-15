import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="toast-wrap">
    <div *ngFor="let m of messages" class="toast" [ngClass]="m.type">
      <div class="text">{{ m.text }}</div>
      <button class="close" (click)="dismiss(m.id)">×</button>
    </div>
  </div>
  `,
  styles: [`
    .toast-wrap { position: fixed; right: 1rem; top: 1rem; display:flex; flex-direction:column; gap:0.6rem; z-index:9999 }
    .toast { min-width:260px; padding:0.8rem 1rem; border-radius:0.6rem; color:#0f172a; display:flex; justify-content:space-between; align-items:center; box-shadow:0 10px 30px rgba(2,6,23,0.6); }
    .toast.success { background: #ecfccb; color: #064e3b }
    .toast.error { background: #fee2e2; color: #7f1d1d }
    .toast.info { background: #e0f2fe; color: #075985 }
    .toast .close { background:transparent; border:none; font-size:1.1rem; cursor:pointer }
  `]
})
export class ToastComponent {
  messages: any[] = [];
  constructor(private toast: ToastService) {
    this.toast.messages.subscribe((m) => this.messages = m);
  }

  dismiss(id: number) { this.toast.dismiss(id); }
}
