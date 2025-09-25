import { VentasService } from './../../../services/ventas.service';
import { CierreCaja, Empresa } from '@store-front/components/interfaces/empresa.interface';
import { Component, ViewEncapsulation, Inject, inject } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';


import { MenuItemModel, MenuModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormValidators, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DetalleVentaComponent } from '../detalleventa/detalleventa.component';
import { TotalesFacturaComponent } from "../totalesfactura/totalesfactura.component";


import { ViewChild, NgModule } from '@angular/core';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

import { NumericTextBoxModule, TextBoxModel } from '@syncfusion/ej2-angular-inputs';
import { ClienteProvService } from 'src/app/clientesprov/services/clienteprov.service';
import { ClienteProv } from 'src/app/clientesprov/interfaces/clienteprov.interface';
import { SharedService } from '@store-front/services/shared.service';
import { Venta } from '@store-front/components/interfaces/factura.interfaces';
import { AuthService } from '@auth/services/auth.service';
import Swal from 'sweetalert2';
import { EmpresasService } from '@store-front/services/empresas.service';


/**
 * Splitter Expand and Collapse
 */
@Component({
    selector: 'factura-venta-component',
    templateUrl: 'facturaventa.component.html',
    styleUrls: ['facturaventa.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SplitterModule, NgTemplateOutlet, TabModule, ReactiveFormsModule, DetalleVentaComponent, TotalesFacturaComponent, ComboBoxModule, NumericTextBoxModule, MenuModule, TextBoxModule]
})

export class FacturaVentaComponent {
  @ViewChild('sample')
  public comboBoxObj!: ComboBoxComponent;
  public menuItems: MenuItemModel[] = [];

  public miEmpresa:Empresa|null  = localStorage.getItem('MiEmpresa') ? (JSON.parse(localStorage.getItem('MiEmpresa') || "")):null;
  public actualEmpresa:Empresa|null  = localStorage.getItem('ActualEmpresa') ? (JSON.parse(localStorage.getItem('ActualEmpresa') || "")):null;

  clienteForm!: FormGroup;
  formapagoForm!: FormGroup;
  clienteObj:any;
  authService = inject(AuthService);
  clienteFactura: ClienteProv|null=null;

  cierreActual:number = 0;
  ventaActual:number = 0;
  ventaActualNo:string = '';
  facturaActiva:Venta|null = null;
  empresasCaja:Empresa[]|null=null;


  public subTotal:Number = 0;
  public cantidad:Number = 0;
  public desc:Number = 0;
  public impuesto:Number = 0;
  public total:Number = 0;

  public pagacon:Number = 0;
  public vuelto:Number = 0;
  public saldo:Number = 0;
  public tarjeta:string = '';


  constructor(private clienteServicio:ClienteProvService, private shared: SharedService, private ventaService:VentasService,
    private empresaServicio:EmpresasService

  ) {
    this.clienteForm = new FormGroup({
      'cedula': new FormControl('', [FormValidators.required]),
      'correo': new FormControl('', [FormValidators.email]),
      'nombres': new FormControl(''),
      'direccion': new FormControl(''),
      'ciudad': new FormControl(''),
      'telefono': new FormControl('', ),
    });

    this.formapagoForm = new FormGroup({
      'totalpagar':new FormControl(''),
      'pagacon':new FormControl(''),
      'cambio':new FormControl(''),
      'referenciatarjeta':new FormControl(''),
      'saldo':new FormControl(''),
    });

  }

    public headerText: any = [{ text: "Datos de Factura", 'iconCss': '' },{ text: "Datos de Cliente", 'iconCss': '' },{ text: "Forma de Pago", 'iconCss': '' },{ text: "Cierre Caja", 'iconCss': '' }];

    async ngOnInit() {

      this.shared.facturaActual$.subscribe(valor => {this.ventaActual = valor;});
      this.shared.facturaActualNo$.subscribe(valor => {this.ventaActualNo = valor;});
      this.shared.clienteFactura$.subscribe(valor2 => {this.clienteFactura = valor2;});
      this.shared.cierreActual$.subscribe(valor2 => {this.cierreActual = valor2;});
      this.shared.empresasCaja$.subscribe(valor2 => {this.empresasCaja = valor2;});
      this.shared.facturaActiva$.subscribe(valor2 => {this.facturaActiva = valor2;});

      this.shared.cantProductos$.subscribe(valor => {this.cantidad = valor;});
      this.shared.subTotal$.subscribe(valor => {this.subTotal = valor;});
      this.shared.descuento$.subscribe(valor2 => {this.desc = valor2;});
      this.shared.impuesto$.subscribe(valor2 => {this.impuesto = valor2;});
      this.shared.total$.subscribe(valor2 => {this.total = valor2;});


      try {
        var respVenta = await this.ventaService.getVentaActual();
        console.log(respVenta,'Datos de Venta Actual Activa');
        if (respVenta){
          this.shared.updatefacturaActualNo(respVenta.nro_comprobante);
          this.shared.updatefacturaActual(respVenta.id || 0);
          this.shared.updatefacturaActiva(respVenta);
          this.menuItems = [
                  {  text: 'Iniciar', iconCss: 'em-icons e-new' },{ separator: true },{ text: 'Finalizar', iconCss: 'em-icons e-save' },          
                  {text: 'Factura No. 001-001-00000' + respVenta.nro_comprobante + '   Fecha:'+ new Date().toISOString(),iconCss: 'em-icons e-error'}
              ];
        }

      try {
          var clientesResp:any = await this.clienteServicio.getClientePorId(respVenta?.id_cliente.toString() || '');
          console.log('cliente recibidoCCedula', clientesResp);
          this.shared.updateClienteFactura(clientesResp);
          if (clientesResp){
            this.clienteForm.patchValue({
              cedula: clientesResp.identificador_fiscal,
              correo: clientesResp.email,
              nombres: clientesResp.nombres,
              direccion: clientesResp.direccion,
              ciudad: 'Cuenca',
              telefono: clientesResp.telefono,
            });
          }else{
            this.clienteForm.patchValue({cedula: '',nombres: '',direccion: '',ciudad: '',telefono: '',});
          }
      } catch (error) {
        this.clienteForm.patchValue({cedula: '',correo:'',nombres: '',direccion: '',ciudad: '',telefono: '',});
      }
           

      } catch (error) {
        console.log('No hay venta activa');
        this.shared.updatefacturaActualNo('');
        this.shared.updatefacturaActual(0);
        this.shared.updatefacturaActiva(null);
        this.menuItems = [
          {  text: 'Iniciar', iconCss: 'em-icons e-new' },{ separator: true },{ text: 'Finalizar', iconCss: 'em-icons e-save' },          
          {text: 'No hay venta activa, Ingrese datos de cliente y seleccione Factura -> Iniciar',iconCss: 'em-icons e-error'}
        ];
      }

      /*if (this.miEmpresa)
        this.empresaForm.patchValue(this.miEmpresa);
      if (this.miEmpresa)
        this.empresaExtForm.patchValue(this.miEmpresa);*/


    /*let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId')!.addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.empresaForm.valid) {
          alert('Customer details added!');
          this.empresaForm.reset();
        } else {
          // validating whole form
          Object.keys(this.empresaForm.controls).forEach(field => {
            const control = this.empresaForm.get(field);
            control!.markAsTouched({ onlySelf: true });
          });
        }
      });*/

  }

  /*get check() { return this.empresaForm.get('check'); }
  get email_check() { return this.empresaForm.get('email_check'); }
  get date_check() { return this.empresaForm.get('date_check'); }
  get city() { return this.empresaForm.get('city'); }
  get state() { return this.empresaForm.get('state'); }
  get Address() { return this.empresaForm.get('Address'); }*/


    // define the JSON of data
    public sportsData: Object[] = [
        { Id: '1', Text: 'Efectivo' },
        { Id: '2', Text: 'Cheque' },
        { Id: '3', Text: 'Tarjeta' },
        { Id: '4', Text: 'Credito' },
    ];


    // maps the appropriate column to fields property
    public fields: Object = { text: 'Text', value: 'Id' };
    // set the height of the popup element
    public height: string = '250px';
    // set the value to select an item based on mapped value at initial rendering
    public value: string = '1';
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Seleccione forma de pago:';

    public onChange(args: any): void {
        let valueEle: HTMLInputElement = document.getElementsByClassName('e-input')[0] as HTMLInputElement;
        let text: any = document.getElementById('text');
        // make empty the input value when typed characters is 'null' in input element
        /*if (this.comboBoxObj.value === "null" || this.comboBoxObj.value === null || this.comboBoxObj.value === "") {
            valueEle.value = '';
        }
        // set null text to the input value when clear the text in ComboBox element
        if (this.comboBoxObj.text === "null" || this.comboBoxObj.text === null || this.comboBoxObj.text === "") {
            text.innerHTML =  'null';
        } else {
            text.innerHTML = this.comboBoxObj.text.toString();
        }*/
    }

    ngAfterViewInit(e: any): void {
        // call the change event's function after initialized the component.
           setTimeout(()=>
      {
        this.onChange(e);
     })
    }

    public accionEnterCedula = async() => {
      if (this.clienteForm.get('cedula')?.value != ''){
      try {
          var clientesResp:any = await this.clienteServicio.getClientePorCedula(this.clienteForm.get('cedula')?.value);
          console.log('cliente recibidoCCedula', clientesResp);
          this.shared.updateClienteFactura(clientesResp);
          if (clientesResp){
            this.clienteForm.patchValue({
              correo: clientesResp.email,
              nombres: clientesResp.nombres,
              direccion: clientesResp.direccion,
              ciudad: 'Cuenca',
              telefono: clientesResp.telefono,
            });
          }else{
            this.clienteForm.patchValue({cedula: '',nombres: '',direccion: '',ciudad: '',telefono: '',});
          }
      } catch (error) {
        this.clienteForm.patchValue({cedula: '',correo:'',nombres: '',direccion: '',ciudad: '',telefono: '',});
      }
      }
    }

    public accionEnterCorreo = async () => {
      if (this.clienteForm.get('correo')?.value != ''){
      try{
        var clientesResp:any = await this.clienteServicio.getClientePorCorreo(this.clienteForm.get('correo')?.value);
        console.log('cliente recibidoCCedula', clientesResp);
        this.shared.updateClienteFactura(clientesResp);
        if (clientesResp){
          this.clienteForm.patchValue({
            cedula: clientesResp.identificador_fiscal,
            nombres: clientesResp.nombres,
            direccion: clientesResp.direccion,
            ciudad: 'Cuenca',
            telefono: clientesResp.telefono,
          });
        }else{
          this.clienteForm.patchValue({cedula: '',nombres: '',direccion: '',ciudad: '',telefono: '',});
        }
        }catch(err){
          this.clienteForm.patchValue({cedula: '',correo:'',nombres: '',direccion: '',ciudad: '',telefono: '',});
        }
      }
    }


    async SelecionaOpcionMenu(ev:any){
      console.log('seleccionado', ev);
      
      if (ev.item.text=="Iniciar" || ev.item.text == 'No hay venta activa, Ingrese datos de cliente y seleccione Factura -> Iniciar'){

        //verificar si tenemos cierre de caja abierto
        console.log('EmpresasCaja', this.empresasCaja);
        var caja = 0;
        if (this.actualEmpresa!.id === this.miEmpresa?.id) caja=1;
        else caja = this.empresasCaja?.find(x=>x.id === this.actualEmpresa!.id)?.id_caja || 1;
        var nuevoCierre =null;
        try {
          nuevoCierre = await this.ventaService.getActiveCierrXId(caja);
          console.log('tiene un cierre activo', nuevoCierre);
        } catch (error) {

          //creamos cierre de caja
          var NuevoCierre:CierreCaja = {
            id:0,
            fechainicio:new Date(),
            fechacierre:new Date(),
            id_usuario:Number(this.authService.user()?.id) || 0,
            total_efectivo_calculado:0,
            total_efectivo_real:0,
            estado:1,
            diferencia_efectivo:0,
            id_caja:caja
          }
          nuevoCierre = await this.ventaService.nuevoCierre(NuevoCierre);
          console.log('nuevo cierre creado', nuevoCierre);
        }



        //alert(this.clienteFactura?.id)
        if (this.clienteFactura && this.clienteFactura?.id != 0 && this.ventaActual == 0){

          this.actualEmpresa  = JSON.parse(localStorage.getItem('ActualEmpresa') || "") || null;
          var nuevaVenta:Venta = {
            id: 0, fecha: new Date(), monto_total: 0, total_impuestos: 0,
            id_usuario: Number(this.authService.user()?.id) || 0,
            saldo: 0, pago_con: 1, referencia_tarjeta: '', vuelto: 0, cantidad_productos: 0,
            sub_total: 0, id_cliente: this.clienteFactura?.id || 0, id_sucursal: this.actualEmpresa?.id_caja || 1,
            id_empresa: this.actualEmpresa?.id || 0, estado: 'Activa',
            valor_impuesto: 0, id_cierre_caja: nuevoCierre?.id||1,
            nro_comprobante: ''
          }
          try {

            var respVenta = await this.ventaService.nuevoVenta(nuevaVenta);
            console.log('Nueva venta creada ',respVenta);
            this.shared.updatefacturaActual(respVenta.id || 0);
            this.shared.updatefacturaActualNo(respVenta.nro_comprobante);
            this.shared.updatefacturaActiva(respVenta);
            this.menuItems = [
                    {  text: 'Iniciar', iconCss: 'em-icons e-new' },{ separator: true },{ text: 'Finalizar', iconCss: 'em-icons e-save' },
                    {text: 'Factura No. 001-001-00000' + (await respVenta).nro_comprobante + '  Fecha: '+new Date().toDateString(),iconCss: 'em-icons e-error'}
                ];

          } catch (error:any) {
            console.log(error)
            Swal.fire('Informacion','Ocurrio un error generando factura ' + (error.code == '23503' ? ' No ha seleccionado cliente o cliente no es valido ':error.message));
          }

        }else{
          if (this.ventaActual != 0)
            Swal.fire('Informacion','No es posible iniciar factura, Finalice venta actual');
          else
            Swal.fire('Informacion','No es posible iniciar factura, Seleccione cliente');
        }

      }
      if (ev.item.text=="Finalizar"){
        
        //Si tengo factura abierta
        if (this.ventaActual == 0 || this.facturaActiva==null){
          Swal.fire('Informacion','No es posible finalizar factura, Inicie una');
        }else{

          //Actualizo datos de cabecera
          let facturaModificar:Venta= this.facturaActiva;
          console.log('factura a modificar', facturaModificar);
          
          facturaModificar.cantidad_productos = Number(this.cantidad);
          facturaModificar.estado = 'Finalizada';
          facturaModificar.monto_total = Number(this.total);
          
          facturaModificar.sub_total=Number(this.subTotal);
          facturaModificar.total_impuestos=Number(this.impuesto);
          facturaModificar.valor_impuesto=15;
          
          //Forma Pago
          facturaModificar.referencia_tarjeta=this.tarjeta;
          facturaModificar.pago_con= Number(this.pagacon);
          facturaModificar.vuelto = Number(this.vuelto);
          facturaModificar.saldo = Number(this.saldo);
          
          let respUpdteVenta = this.ventaService.editarVenta(facturaModificar.id || 0,facturaModificar);
          console.log('factura modificada', respUpdteVenta);
          
          //Actualizo registro de cierre caja

          //encero para que se cree una nueva
          this.shared.updateDetallefactura(null);
          this.shared.updatefacturaActual(0);
          this.shared.updatefacturaActualNo('');
          this.shared.updatefacturaActiva(null);
          this.shared.updateCierreActual(0);
          this.shared.updateClienteFactura(null);
          this.shared.updateTotal(0);
          this.shared.updateImpuesto(0);
          this.shared.updateSubTotal(0);
          this.shared.updateDescuento(0);
          this.shared.updatecantProductos(0);
          

          this.clienteForm.patchValue({cedula: '',correo:'',nombres: '',direccion: '',ciudad: '',telefono: '',});
          this.pagacon = 0;
          this.vuelto = 0;
          this.saldo = 0;
          this.tarjeta = '';
          Swal.fire('Informacion','Factura finalizada con exito, Imprima o genere reporte de la misma');
          setTimeout(async () => {
            await this.actualizaDats();
          }, 3000);
        }

      }
    }


    async actualizaDats(){

    try {
        var respVenta = await this.ventaService.getVentaActual();
        console.log(respVenta,'Datos de Venta Actual Activa');
        if (respVenta){
          this.shared.updatefacturaActualNo(respVenta.nro_comprobante);
          this.shared.updatefacturaActual(respVenta.id || 0);
          this.shared.updatefacturaActiva(respVenta);
          this.menuItems = [
                  {  text: 'Iniciar', iconCss: 'em-icons e-new' },{ separator: true },{ text: 'Finalizar', iconCss: 'em-icons e-save' },
                  {text: 'Factura No. 001-001-00000' + respVenta.nro_comprobante + '   Fecha:'+ new Date().toISOString(),iconCss: 'em-icons e-error'}
              ];
        }

      try {
          var clientesResp:any = await this.clienteServicio.getClientePorId(respVenta?.id_cliente.toString() || '');
          console.log('cliente recibidoCCedula', clientesResp);
          this.shared.updateClienteFactura(clientesResp);
          if (clientesResp){
            this.clienteForm.patchValue({
              cedula: clientesResp.identificador_fiscal,
              correo: clientesResp.email,
              nombres: clientesResp.nombres,
              direccion: clientesResp.direccion,
              ciudad: 'Cuenca',
              telefono: clientesResp.telefono,
            });
          }else{
            this.clienteForm.patchValue({cedula: '',nombres: '',direccion: '',ciudad: '',telefono: '',});
          }
      } catch (error) {
        this.clienteForm.patchValue({cedula: '',correo:'',nombres: '',direccion: '',ciudad: '',telefono: '',});
      }


      } catch (error) {
        console.log('No hay venta activa');
        this.shared.updatefacturaActualNo('');
        this.shared.updatefacturaActual(0);
        this.shared.updatefacturaActiva(null);
        this.menuItems = [
          {  text: 'Iniciar', iconCss: 'em-icons e-new' },{ separator: true },{ text: 'Finalizar', iconCss: 'em-icons e-save' },
          {text: 'No hay venta activa, Ingrese datos de cliente y seleccione Factura -> Iniciar',iconCss: 'em-icons e-error'}
        ];
      }


    }

    cambiaPago = (ev:any) =>{
      console.log('cambio pago', ev);
      this.pagacon = ev.value;
      if (this.pagacon < this.total){
        this.saldo = Number(this.total) - Number(this.pagacon);
        this.vuelto = 0;
      }else{
        this.vuelto = Number(this.pagacon) - Number(this.total);
        this.saldo = 0;
      }
    }


}
