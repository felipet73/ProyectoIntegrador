import { User } from '@auth/interfaces/user.interface';

export interface EmpresasResponse {
  data: Empresa[];
  count?: number | null;
  status?:number;
  statusText?:string;
  error?:string;
}

export interface Empresa {
  id?: string;
  nombre: string;
  id_fiscal: string;
  direccion_fiscal: string;
  simbolo_moneda: string;
  logo: string;
  id_auth: number;
  id_usuario: number;
  iso: string;
  pais: string;
  currency: string;
  impuesto: string;
  valor_impuesto:number;
  nombre_moneda:string;
  correo: string;
  pie_pagina_ticket:string;
  user: User;
}

export interface Sucursal {

}

export interface Caja {

}

export interface Asignacion_Sucursal {

}



