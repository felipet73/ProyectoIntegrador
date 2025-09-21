import { Empresa } from '@store-front/components/interfaces/empresa.interface';

export interface ClientesResponse {
  count: number;
  pages: number;
  Clientes: ClienteProv[];
}

export interface ClienteProv {
  id?: number;
  nombres: string;
  id_empresa: number;
  empresa: Empresa;
  direccion: string;
  telefono: string;
  email: string;
  identificador_nacional: string;
  identificador_fiscal: string;
  tipo: string;
  estado: string;
  fecha_registro: Date;
}


