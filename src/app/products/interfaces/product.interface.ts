import { User } from '@auth/interfaces/user.interface';

export interface ProductsResponse {
  count: number;
  pages: number;
  products: Product[];
}

export interface Product {
  id: number,
  nombre: string,
  precio_venta: number,
  precio_compra: number,
  id_categoria: number,
  categoria: string,
  codigo_barras: string,
  codigo_interno: string,
  id_empresa: number,
  sevende_por: string,
  maneja_intenarios: boolean,
  maneja_multiprecios: boolean,
  foto: string,
}

export enum Gender {
  Kid = 'kid',
  Men = 'men',
  Unisex = 'unisex',
  Women = 'women',
}

export enum Size {
  L = 'L',
  M = 'M',
  S = 'S',
  XS = 'XS',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}
