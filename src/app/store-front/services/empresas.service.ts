import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';


import { SupabaseService } from 'src/app/supabase/supabase.service';

import Swal from 'sweetalert2';
import { Empresa, EmpresasResponse } from '@store-front/components/interfaces/empresa.interface';

//type HasEmpresas = '' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class EmpresasService {
  private _tieneEmpresas = signal<number>(0);
  private _empresas = signal<Empresa[] | null>(null);
  private supabaseService:SupabaseService = inject(SupabaseService);
  private http = inject(HttpClient);

  tieneEmpresas = computed<number>(() => {
    return 0;
  });

  empresas = computed(() => this._empresas());

  logISupaBase(){  }

  async getAllEmpresasUsers(id_User: number): Promise<Empresa[] | null> {
    const { data, error } = await this.supabaseService.client.from('empresa').select("*").eq('id_usuario',id_User);
    if (error) throw error;
    return data;
  }

  AllEmpresas(id_User: number): Observable<Empresa[] | null> {
      this.supabaseService.client.from('empresa').select("*").eq('id_usuario',id_User).then( (respEmpresas) => {
            console.log(respEmpresas, 'empresas de usuario');
            if (respEmpresas.data?.length === 0) {
              this._empresas.set(null);
              return of(null);
            } else {
              this._empresas.set(respEmpresas.data);
              console.log('returning', respEmpresas.data)
              return of(respEmpresas.data);
            }
        });
        return of(null);
  }




}
