import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage { id: number; type: 'success'|'error'|'info'; text: string }

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  private messages$ = new BehaviorSubject<ToastMessage[]>([]);

  get messages() { return this.messages$.asObservable(); }

  show(text: string, type: ToastMessage['type']='info', ttl = 4000) {
    const id = ++this.counter;
    const msg: ToastMessage = { id, type, text };
    const current = this.messages$.value.slice();
    current.push(msg);
    this.messages$.next(current);
    if (ttl > 0) setTimeout(() => this.dismiss(id), ttl);
    return id;
  }

  showSuccess(text: string, ttl = 4000) { return this.show(text, 'success', ttl); }
  showError(text: string, ttl = 6000) { return this.show(text, 'error', ttl); }

  dismiss(id: number) {
    const filtered = this.messages$.value.filter(m => m.id !== id);
    this.messages$.next(filtered);
  }
}
