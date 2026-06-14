import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const url = (window as any)['__env__']?.SUPABASE_URL || '<YOUR_SUPABASE_URL>';
    const key = (window as any)['__env__']?.SUPABASE_ANON_KEY || '<YOUR_SUPABASE_ANON_KEY>';
    this.supabase = createClient(url, key);
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signInWithGoogle() {
    const { error } = await this.supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) throw error;
    return true;
  }

  async resetPassword(email: string) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
  }

  async saveStudentProfile(profile: any) {
    // Legacy direct save; prefer calling backend register endpoint for insertion+email
    const res = await fetch('/api/register-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile })
    });
    if (!res.ok) throw await res.json();
    return await res.json();
  }
}
