import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from 'src/app/supabase/supabase.service';
import { CierreCaja, Empresa } from '@store-front/components/interfaces/empresa.interface';
import { Venta } from '@store-front/components/interfaces/factura.interfaces';
import { AuthService } from '@auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class VentasService {
  private _venta = signal<Venta | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private supabaseService:SupabaseService = inject(SupabaseService);
  venta = computed(() => this._venta());
  token = computed(this._token);
  public miEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('MiEmpresa') || "") || null;
  public acutualEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('ActualEmpresa') || "") || null;

  authService = inject(AuthService);

  constructor() {}

  // Obtener todos
  async getAllVentas(): Promise<Venta[]> {
    const { data, error } = await this.supabaseService.client.from('ventas').select('*').eq('id_empresa', this.acutualEmpresa?.id || "");
    if (error) throw error;
    return data as Venta[];
  }

  // Obtener ventao por id
  async getVentaPorId(id: string): Promise<Venta | null> {
    const { data, error } = await this.supabaseService.client.from('ventas').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Venta;
  }

  async getVentaActual(): Promise<Venta | null> {
    this.acutualEmpresa = JSON.parse(localStorage.getItem('ActualEmpresa') || "") || null;
    const { data, error } = await this.supabaseService.client.from('ventas').select('*').eq('id_empresa', this.acutualEmpresa!.id).eq('id_usuario', this.authService.user()?.id).eq('estado', 'Activa').single();
    if (error) throw error;
    return data as Venta;
  }


  // Insertar nuevo ventao
  async nuevoVenta(venta: Venta): Promise<Venta> {
    var { data, error } = await this.supabaseService.client
      .rpc('contar_registros_empresa_sucursal', {
        p_empresa_id: venta.id_empresa,
        p_sucursal_id: venta.id_sucursal
      });
    venta.nro_comprobante = data+1;
    console.log(data);
    var { data, error } = await this.supabaseService.client.rpc('get_next_venta_id');
    if (error) throw error;
    console.log("Siguiente ID:", data);
    venta.id = data;
    var { data, error } = await this.supabaseService.client
      .from('ventas')
      .insert([venta])
      .select()
      .single();
    if (error) throw error;
    return data as Venta;
  }

  // Modifica ventao por id
  async editarVenta(id: number, venta: Partial<Venta>): Promise<Venta> {
    const { data, error } = await this.supabaseService.client
      .from('ventas')
      .update(venta)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Venta;
  }

  // Eliminar ventao por id
  async eliminarVenta(id: number): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('ventas')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  async getActiveCierrXId(id: number): Promise<CierreCaja | null> {
    const { data, error } = await this.supabaseService.client.from('cierrecaja').select('*').eq('id_caja', id).eq('estado', 1).single();
    if (error) throw error;
    return data as CierreCaja;
  }

  async nuevoCierre(cierre: CierreCaja): Promise<CierreCaja> {
    var { data, error } = await this.supabaseService.client.rpc('get_next_cierrecaja_id');
    if (error) throw error;
    console.log("Siguiente ID:", data);
    cierre.id = data;
    var { data, error } = await this.supabaseService.client
      .from('cierrecaja')
      .insert([cierre])
      .select()
      .single();
    if (error) throw error;
    return data as CierreCaja;
  }

}
