import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { EmpresaComponent } from '../empresa/empresa.component';

import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Empresa } from '../interfaces/empresa.interface';
import { ImageSelectorComponent } from '../imageselector/imageselector.component';

/**
 * Splitter Expand and Collapse
 */
@Component({
    selector: 'total-empresa-component',
    templateUrl: 'totalemprea.component.html',
    styleUrls: ['totalempresa.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SplitterModule, NgTemplateOutlet, EmpresaComponent, TabModule,  ReactiveFormsModule, ImageSelectorComponent ]
})

export class TotalEmpresaComponent {

  public miEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('MiEmpresa') || "") || null;
  empresaForm!: FormGroup;
  empresaExtForm!: FormGroup;
/*id?: string | undefined;
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
    valor_impuesto: number;
    nombre_moneda: string;
    correo: string;
    pie_pagina_ticket: string;
    user: User;*/
  constructor() {
    this.empresaForm = new FormGroup({
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
    });

  }

 public headerText: any = [{ text: "Datos Basicos de la Empresa", 'iconCss': '' },
        { text: "Mas Detalles", 'iconCss': '' }];

    ngOnInit(): void {
    
    console.log('before patch', this.miEmpresa)
      if (this.miEmpresa)
        this.empresaForm.patchValue(this.miEmpresa);
      if (this.miEmpresa)
        this.empresaExtForm.patchValue(this.miEmpresa);

      
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
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
      });
      
  }

  get check() { return this.empresaForm.get('check'); }
  get email_check() { return this.empresaForm.get('email_check'); }
  get date_check() { return this.empresaForm.get('date_check'); }
  get city() { return this.empresaForm.get('city'); }
  get state() { return this.empresaForm.get('state'); }
  get Address() { return this.empresaForm.get('Address'); }



}
