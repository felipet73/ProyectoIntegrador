import { Empresa } from '@store-front/components/interfaces/empresa.interface';
import { Component, ViewEncapsulation, Inject, inject } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';


import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DetalleVentaComponent } from '../detalleventa/detalleventa.component';
import { SharedService } from '@store-front/services/shared.service';
import { AuthService } from '@auth/services/auth.service';
import { ClienteProv } from 'src/app/clientesprov/interfaces/clienteprov.interface';
import { TotalEmpresaComponent } from '../../totalempresa/totalempresa.component';



/**
 * Splitter Expand and Collapse
 */
@Component({
    selector: 'totales-factura-component',
    templateUrl: 'totalesfactura.component.html',
    styleUrls: ['totalesfactura.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SplitterModule, TabModule,  ReactiveFormsModule ]
})

export class TotalesFacturaComponent {

  public miEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('MiEmpresa') || "") || null;
  public actualEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('ActualEmpresa') || "") || null;

  authService = inject(AuthService);

  empresaForm!: FormGroup;
  empresaExtForm!: FormGroup;

  public subTotal:Number = 0;
  public cantidad:Number = 0;
  public desc:Number = 0;
  public impuesto:Number = 0;
  public total:Number = 0;

  public clienteFactura:ClienteProv|null = null;

  constructor(private shared: SharedService ) {

   /* this.empresaForm = new FormGroup({
      'nombre': new FormControl('', [FormValidators.required]),
      'id_fiscal': new FormControl(''),
      'direccion_fiscal': new FormControl('', [FormValidators.date]),
      'correo': new FormControl('', [FormValidators.email]),
      'pais': new FormControl(''),
    });
    this.empresaExtForm = new FormGroup({
      'iso': new FormControl(''),
      'simbolo_moneda':new FormControl(''),
      'currency':new FormControl(''),
      'impuesto':new FormControl(''),
      'valor_impuesto':new FormControl(''),
      'nombre_moneda':new FormControl(''),
    });*/

  }

 public headerText: any = [{ text: "Datos Basicos de la Empresa", 'iconCss': '' },
        { text: "Mas Detalles", 'iconCss': '' }];

    ngOnInit(): void {

    this.shared.cantProductos$.subscribe(valor => {this.cantidad = valor;});
    this.shared.subTotal$.subscribe(valor => {this.subTotal = valor;});
    this.shared.clienteFactura$.subscribe(valor2 => {this.clienteFactura = valor2;});
    this.shared.descuento$.subscribe(valor2 => {this.desc = valor2;});
    this.shared.impuesto$.subscribe(valor2 => {this.impuesto = valor2;});
    this.shared.total$.subscribe(valor2 => {this.total = valor2;});


    /*console.log('before patch', this.miEmpresa)
      if (this.miEmpresa)
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

  get check() { return this.empresaForm.get('check'); }
  get email_check() { return this.empresaForm.get('email_check'); }
  get date_check() { return this.empresaForm.get('date_check'); }
  get city() { return this.empresaForm.get('city'); }
  get state() { return this.empresaForm.get('state'); }
  get Address() { return this.empresaForm.get('Address'); }

  Mostrar(num: any) {
    const n: number = Number(num);
    return (Number.isInteger(n)) ? n.toFixed(2) : (Math.round(n * 100) / 100).toFixed(2);
  }

}
