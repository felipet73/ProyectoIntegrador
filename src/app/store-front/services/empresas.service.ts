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
  //private _token = signal<string | null>(localStorage.getItem('token'));
  private supabaseService:SupabaseService = inject(SupabaseService);
  private http = inject(HttpClient);

  /*checkEmpresasResource = rxResource({
    loader: () => this.tieneEmpresas(),
  });*/

  tieneEmpresas = computed<number>(() => {

    //if (this._authStatus() === 'checking') return 'checking';

    /*if (this._user()) {
      return 'authenticated';
    }*/

    return 0;
  });

  empresas = computed(() => this._empresas());
  //token = computed(this._token);
  //isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

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
              //crear usuario
              /*this.supabaseService.client.from('usuarios').insert([
                { correo: email, nombres: '', estado: 'ACTIVO', id_rol: 1, id_auth: resplogin.data.user?.id }
              ]).then( (respCreate) => {
                console.log(respCreate, 'usuario creado');
              });*/
            } else {
              //console.log('usuario ya existe en nuestra base de datos');
              this._empresas.set(respEmpresas.data);
              console.log('returning', respEmpresas.data)
              return of(respEmpresas.data);
            }
        });
        return of(null);
  }


 /* checkStatus(): Observable<boolean> {
    this.supabaseService.client.auth.getUser().then( (resp) => {
      console.log(resp, 'get user');
       if (resp.data.user) {
        this._authStatus.set('authenticated');
        this._user.set({
        id: '1',
        email: resp.data.user?.email ?? 'no-email',
        fullName: 'Test User',
        isActive: true,
        roles: ['admin'],
        });
        return of(true);
       } else {
        this._authStatus.set('not-authenticated');
        this._user.set(null);
        this._token.set(null);
        localStorage.removeItem('token');
        return of(false);
       }
    });
      const token = localStorage.getItem('token');
      if (!token) {
        this.logout();
        return of(false);
      }
    return of(false);
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    this.supabaseService.client.auth.signOut();
    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);
    localStorage.setItem('token', token);
    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }*/
}
