import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from 'src/app/supabase/supabase.service';
import { ClienteProv } from '../interfaces/clienteprov.interface';
import { Empresa } from '@store-front/components/interfaces/empresa.interface';


@Injectable({ providedIn: 'root' })
export class ClienteProvService {
  private _clienteprov = signal<ClienteProv | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private supabaseService:SupabaseService = inject(SupabaseService);
  clienteprov  = computed(() => this._clienteprov());
  token = computed(this._token);
  public miEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('MiEmpresa') || "") || null;

  constructor() {}


  // Obtener todos
  async getAllClientes(): Promise<ClienteProv[]> {
    const { data, error } = await this.supabaseService.client.from('clientes_proveedores').select('*').eq('id_empresa', this.miEmpresa?.id || "");
    if (error) throw error;
    return data as ClienteProv[];
  }

  // Obtener cliente por id
  async getClientePorId(id: string): Promise<ClienteProv | null> {
    const { data, error } = await this.supabaseService.client.from('clientes_proveedores').select('*').eq('id', id).single();
    if (error) throw error;
    return data as ClienteProv;
  }

  async getClientePorCedula(cedula: string): Promise<ClienteProv | null> {
    const { data, error } = await this.supabaseService.client.from('clientes_proveedores').select('*').eq('identificador_fiscal', cedula).single();
    if (error) throw error;
    return data as ClienteProv;
  }
  async getClientePorCorreo(correo: string): Promise<ClienteProv | null> {
    const { data, error } = await this.supabaseService.client.from('clientes_proveedores').select('*').eq('email', correo).single();
    if (error) throw error;
    return data as ClienteProv;
  }

  // Insertar nuevo cliente
  async nuevoCliente(cliente: ClienteProv): Promise<ClienteProv> {

    var { data, error } = await this.supabaseService.client.rpc('get_next_cliente_id');
    if (error) throw error;
    console.log("Siguiente ID:", data);

    cliente.id = data;
    if (!cliente.tipo || cliente.tipo === '') cliente.tipo = 'CLIENTE';
    if (!cliente.fecha_registro) cliente.fecha_registro = new Date();
    var { data, error } = await this.supabaseService.client
      .from('clientes_proveedores')
      .insert([cliente])
      .select()
      .single();
    if (error) throw error;
    return data as ClienteProv;
  }

  // Modifica cliente por id
  async editarCliente(id: number, cliente: Partial<ClienteProv>): Promise<ClienteProv> {
    const { data, error } = await this.supabaseService.client
      .from('clientes_proveedores')
      .update(cliente)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as ClienteProv;
  }

  // Eliminar cliente por id
  async eliminarCliente(id: number): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('clientes_proveedores')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }



}
