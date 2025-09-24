import { User } from '@auth/interfaces/user.interface';

export interface EmpresasResponse {
  data: Empresa[];
  count?: number | null;
  status?:number;
  statusText?:string;
  error?:string;
}

export interface Empresa {
  id?: number;
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
  id_caja:number;
}

export interface Sucursal {
  id:number;
  nombre:string;
  direccion_fiscal:string;
  id_empresa:number;
  delete:boolean;
}

export interface Almacen {
  id:number;
  id_sucursal:number;
  fecha_creacion:Date;
  delete:boolean;
  nombre:string;
  default:boolean;
}


export interface Caja {
  id:number;
  descripcion:string;
  id_sucursal:number;
  fecha_creacion:Date;
  delete:boolean;
  print:boolean;
}

export interface Asignacion_Sucursal {
  id:number;
  id_sucursal:number;
  id_usuario:number;
  id_caja:number;
}

export interface CierreCaja {
  id:number;
  fechainicio:Date;
  fechacierre:Date;
  id_usuario:number;
  total_efectivo_calculado:number;
  total_efectivo_real:number;
  estado:number;
  diferencia_efectivo:number;
  id_caja:number;
}




