import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from 'src/app/supabase/supabase.service';

import { Empresa } from '@store-front/components/interfaces/empresa.interface';
import { Categoria } from '@products/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private _categoria = signal<Categoria | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private supabaseService:SupabaseService = inject(SupabaseService);
  categoria  = computed(() => this._categoria());
  token = computed(this._token);
  public miEmpresa:Empresa|null  = localStorage.getItem('MiEmpresa') ? (JSON.parse(localStorage.getItem('MiEmpresa') || "")):null;
  public acutualEmpresa:Empresa|null  = localStorage.getItem('ActualEmpresa') ? (JSON.parse(localStorage.getItem('ActualEmpresa') || "")):null;

  constructor() {}

  // Obtener todos
  async getAllCategorias(): Promise<Categoria[]> {
    const { data, error } = await this.supabaseService.client.from('categorias').select('*').eq('id_empresa', this.acutualEmpresa?.id || "");
    if (error) throw error;
    return data as Categoria[];
  }

  // Obtener categoriao por id
  async getCategoriaPorId(id: string): Promise<Categoria | null> {
    const { data, error } = await this.supabaseService.client.from('categorias').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Categoria;
  }

  // Insertar nuevo categoriao
  async nuevoProucto(categoria: Categoria): Promise<Categoria> {

    var { data, error } = await this.supabaseService.client.rpc('get_next_categoria_id');
    if (error) throw error;
    console.log("Siguiente ID:", data);
    categoria.id = data;
    var { data, error } = await this.supabaseService.client
      .from('categorias')
      .insert([categoria])
      .select()
      .single();
    if (error) throw error;
    return data as Categoria;
  }

  // Modifica categoriao por id
  async editarCategoria(id: number, categoria: Partial<Categoria>): Promise<Categoria> {
    const { data, error } = await this.supabaseService.client
      .from('categorias')
      .update(categoria)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Categoria;
  }

  // Eliminar categoriao por id
  async eliminarCategoria(id: number): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('categorias')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

}


