export interface Venta {
  id?: number;
  fecha: Date;
  monto_total: number;
  total_impuestos: number;
  id_usuario: number;
  saldo: number;
  pago_con: number;
  referencia_tarjeta: string;
  vuelto: number;
  cantidad_productos: number;
  sub_total: number;
  id_cliente: number;
  id_sucursal:number;
  id_empresa:number;
  estado: string;
  valor_impuesto:number;
  id_cierre_caja: number;
  nro_comprobante: string;
}

export interface DetalleVenta {
  id?: number;
  id_venta: number;
  cantidad: number;
  precio_venta: number;
  total: number;
  descripcion: string;
  id_producto: number;
  precio_compra: number;
  id_sucursal: number;
  estado: string;
  id_almacen: string;
}
