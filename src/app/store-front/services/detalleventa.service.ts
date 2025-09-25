import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from 'src/app/supabase/supabase.service';
import { Empresa } from '@store-front/components/interfaces/empresa.interface';
import { DetalleVenta } from '@store-front/components/interfaces/factura.interfaces';

@Injectable({ providedIn: 'root' })
export class DetalleVentaService {
  private _detalleventa = signal<DetalleVenta | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private supabaseService:SupabaseService = inject(SupabaseService);
  detalleventa  = computed(() => this._detalleventa());
  token = computed(this._token);
  public miEmpresa:Empresa|null  = localStorage.getItem('MiEmpresa') ? (JSON.parse(localStorage.getItem('MiEmpresa') || "")):null;
  public actualEmpresa:Empresa|null  = localStorage.getItem('ActualEmpresa') ? (JSON.parse(localStorage.getItem('ActualEmpresa') || "")):null;
  constructor() {}

  // Obtener todos
  async getAllDetalleVentas(): Promise<DetalleVenta[]> {
    const { data, error } = await this.supabaseService.client.from('detalle_venta').select('*');
    if (error) throw error;
    return data as DetalleVenta[];
  }

  // Obtener detalleventao por id
  async getDetalleVentaPorId(id: number): Promise<DetalleVenta[] | null> {
    const { data, error } = await this.supabaseService.client.from('detalle_venta').select('*').eq('id_venta', id);
    if (error) throw error;
    return data as DetalleVenta[];
  }

  // Insertar nuevo detalleventao
  async nuevoDetalleVenta(detalleventa: DetalleVenta): Promise<DetalleVenta> {
    var { data, error } = await this.supabaseService.client.rpc('get_next_detalleventa_id');
    if (error) throw error;
    console.log("Siguiente ID:", data);
    detalleventa.id = data;
    var { data, error } = await this.supabaseService.client
      .from('detalle_venta')
      .insert([detalleventa])
      .select()
      .single();
    if (error) throw error;
    return data as DetalleVenta;
  }

  // Modifica detalleventao por id
  async editarDetalleVenta(id: number, detalleventa: Partial<DetalleVenta>): Promise<DetalleVenta> {
    const { data, error } = await this.supabaseService.client
      .from('detalle_venta')
      .update(detalleventa)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as DetalleVenta;
  }

  // Eliminar detalleventao por id
  async eliminarDetalleVenta(id: number): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('detalle_venta')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

}
