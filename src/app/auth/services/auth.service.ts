import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interface';
import { SupabaseService } from 'src/app/supabase/supabase.service';

import Swal from 'sweetalert2';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
//const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  //private _authStatus = signal<AuthStatus>('authenticated');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private supabaseService:SupabaseService = inject(SupabaseService);
  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {

    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(this._token);
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  logISupaBase(){  }

  login(email: string, password: string): Observable<boolean> {
    this.supabaseService.client.auth.signUp({
        email,
        password,
        options: {
          data: { role: 'user' } // opcional: metadatos para el usuario
        }
      }).then( (resp) => {
        this.supabaseService.client.auth.signInWithPassword({ email, password }).then( (resplogin) => {
          console.log(resplogin, 'login response');
          if (resplogin.error) {
            this._authStatus.set('not-authenticated');
            this._user.set(null);
            this._token.set(null);
            localStorage.removeItem('token');
            Swal.fire({
              title: "No es posible Loguearte!",
              text: resplogin.error.message == `Email not confirmed` ? `Un email ha sido enviado a ${email}, por favor confirma tu email mediante el link y vuelve a intentar` : resplogin.error.message,
              icon: "error",
              draggable: true
            }).then(() => {
                return of(false);
            });
            return of(false);
          }
          this._authStatus.set(resplogin.data.user?.aud ? 'authenticated' : 'not-authenticated');
          this._token.set(resplogin.data.session?.access_token ?? null);
          localStorage.setItem('token', resplogin.data.session?.access_token ?? null);
          this._user.set({id: 'no-id',email: email,fullName: '',isActive: true,roles: ['admin']});
          //crear si el usuario no existe en nuestra base de datos
          this.supabaseService.client.from('usuarios').select("*").eq('correo',email).then( (respUsuarios) => {
            console.log(respUsuarios, 'usuarios query');
            if (respUsuarios.data?.length === 0) {
              //crear usuario
              this.supabaseService.client.from('usuarios').insert([
                { correo: email, nombres: '', estado: 'ACTIVO', id_rol: 1, id_auth: resplogin.data.user?.id }
              ]).then( (respCreate) => {
                console.log(respCreate, 'usuario creado');
              });
              this._user.set({id: resplogin.data.user?.id ?? 'no-id',email: email, fullName: '', isActive: true, roles: ['admin']});
            } else {
              console.log('usuario ya existe en nuestra base de datos');
              this._user.set({id: resplogin.data.user?.id ?? 'no-id',email: email,fullName: respUsuarios.data?.[0].nombres ?? 'no-name',isActive: true,roles: ['admin'], usuario: respUsuarios.data?.[0]});
            }
        });
        return of(true);
        });
        },
        catchError((error: any) => this.handleAuthError(error))
      );
    return of(true);
  }

  checkStatus(): Observable<boolean> {
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
  }
}
