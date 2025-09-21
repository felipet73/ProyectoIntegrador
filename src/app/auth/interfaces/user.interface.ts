export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  usuario?: Usuario
}

export interface Usuario {
  id :number;
  nombres : string;
  id_tipodocumento :number;
  nro_doc:string;
  telefono:string;
  id_rol:number;
  correo:string;
  fecharegistro:Date;
  estado: string;
  id_auth:string;
  tema :string;
}
