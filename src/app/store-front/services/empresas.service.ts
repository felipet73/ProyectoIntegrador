import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';


import { SupabaseService } from 'src/app/supabase/supabase.service';

import Swal from 'sweetalert2';
import { Asignacion_Sucursal, Caja, Empresa, EmpresasResponse, Sucursal } from '@store-front/components/interfaces/empresa.interface';
import { User } from '@auth/interfaces/user.interface';

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

  async getAllSucursalesEmpresa(id_Empresa: number): Promise<Sucursal[] | null> {
    const { data, error } = await this.supabaseService.client.from('sucursales').select("*").eq('id_empresa',id_Empresa);
    if (error) throw error;
    return data;
  }

  async getAllCajasSucursal(id_Sucursal: number): Promise<Caja[] | null> {
    const { data, error } = await this.supabaseService.client.from('caja').select("*").eq('id_sucursal',id_Sucursal);
    if (error) throw error;
    return data;
  }

  async getAllUsuariosAsignados(id_Sucursal: number): Promise<Asignacion_Sucursal[] | null> {
    const { data, error } = await this.supabaseService.client.from('asignacion_sucursal').select("*").eq('id_sucursal',id_Sucursal);
    if (error) throw error;
    return data;
  }

  async getAllAsignacionesUsuario(id_Usuario: number): Promise<Asignacion_Sucursal[] | null> {
    const { data, error } = await this.supabaseService.client.from('asignacion_sucursal').select("*").eq('id_usuario',id_Usuario);
    if (error) throw error;
    return data;
  }

  async getEmpresXSucursal(id_Sucursal: number): Promise<Asignacion_Sucursal[] | null> {
    var dataR:any = await this.supabaseService.client.from('sucursales').select("*").eq('id',id_Sucursal);
    if (dataR.error) throw dataR.error;
    var data2 =null;
    if (dataR)
    {
      console.log(dataR.data, 'sucursal')
      data2 = await this.supabaseService.client.from('empresa').select("*").eq('id', dataR.data[0].id_empresa  );
      if (data2.error) throw data2.error;
    }
    return data2?.data[0] || null;
  }




}
