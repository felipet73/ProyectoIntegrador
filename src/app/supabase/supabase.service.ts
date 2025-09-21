import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

const SUPABASE_URL = environment.SUPABASE_URL;
const SUPABASE_KEY = environment.SUPABASE_KEY;

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      SUPABASE_URL,
      SUPABASE_KEY );
  }

  get client() {
    return this.supabase;
  }
}
