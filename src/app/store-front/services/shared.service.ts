import { Injectable } from '@angular/core';
import { Empresa } from '@store-front/components/interfaces/empresa.interface';
import { DetalleVenta, Venta } from '@store-front/components/interfaces/factura.interfaces';
import { BehaviorSubject } from 'rxjs';
import { ClienteProv } from 'src/app/clientesprov/interfaces/clienteprov.interface';

@Injectable({ providedIn: 'root' })
export class SharedService {

  private cantidadProductos = new BehaviorSubject<number>(0.00);
  private subtotal = new BehaviorSubject<number>(0.00);
  private descuento = new BehaviorSubject<number>(0.00);
  private impuesto = new BehaviorSubject<number>(0.00);
  private total = new BehaviorSubject<number>(0.00);

  private cierreActual = new BehaviorSubject<number>(0);

  private cajaActual = new BehaviorSubject<number>(0);
  private sucursalActual = new BehaviorSubject<number>(0);
  private empresasCaja = new BehaviorSubject<Empresa[]|null>(null);

  private facturaActual = new BehaviorSubject<number>(0);
  private facturaActualNo = new BehaviorSubject<string>('000-000-000000');
  private facturaActiva = new BehaviorSubject<Venta | null >(null);

  private clienteFactura = new BehaviorSubject<ClienteProv|null>(null);

  private dataDetalleFactura = new BehaviorSubject<DetalleVenta[]|null>(null);

  cantProductos$ = this.cantidadProductos.asObservable();
  subTotal$ = this.subtotal.asObservable();
  descuento$ = this.descuento.asObservable();
  impuesto$ = this.impuesto.asObservable();
  total$ = this.total.asObservable();
  clienteFactura$ = this.clienteFactura.asObservable();

  cierreActual$ = this.cierreActual.asObservable();
  cajaActual$ = this.cajaActual.asObservable();
  sucursalActual$ = this.sucursalActual.asObservable();
  empresasCaja$ = this.empresasCaja.asObservable();

  facturaActual$ = this.facturaActual.asObservable();
  facturaActualNo$ = this.facturaActualNo.asObservable();
  facturaActiva$ = this.facturaActiva.asObservable();
  detalleActivo$ = this.dataDetalleFactura.asObservable();

  updatecantProductos(valor: number) {this.cantidadProductos.next(valor);}
  updateSubTotal(valor1: number) {this.subtotal.next(valor1);}
  updateDescuento(valor2: number) {this.descuento.next(valor2);}
  updateImpuesto(valor2: number) {this.impuesto.next(valor2);}
  updateTotal(valor2: number) {this.total.next(valor2);}

  updateClienteFactura(valor2: ClienteProv|null) { this.clienteFactura.next(valor2);}

  updateCierreActual(valor2: number) {this.cierreActual.next(valor2);}

  updatefacturaActual(valor2: number) {this.facturaActual.next(valor2);}
  updatefacturaActualNo(valor2: string) {this.facturaActualNo.next(valor2);}

  updatefacturaActiva(valor2: Venta|null) {this.facturaActiva.next(valor2);}

  updateEmpresasCaja(valor2: Empresa[]|null) {this.empresasCaja.next(valor2);}

  updateDetallefactura(valor2: DetalleVenta[]|null) {this.dataDetalleFactura.next(valor2);}

}
