import { CurrencyPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

import { OnInit, ViewChild } from '@angular/core';

import { EditService, ToolbarService, PageService, SortService, FilterService, NewRowPosition, GridModule, PdfExportService, ContextMenuClickEventArgs, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ResizeService, ExcelExportService, ContextMenuService } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel,  SelectionService } from '@syncfusion/ej2-angular-grids';
import { ClienteProvService } from '../../services/clienteprov.service';
import { ClientesResponse, ClienteProv } from '../../interfaces/clienteprov.interface';
import { Empresa } from '@store-front/components/interfaces/empresa.interface';
import Swal from 'sweetalert2';


@Component({
    selector: 'clientesprov-table',
    templateUrl: 'clientesprov-table.component.html',
    providers: [ToolbarService, EditService, PageService, SortService, FilterService, ResizeService, ExcelExportService, PdfExportService, ContextMenuService,  SelectionService],
    standalone: true,
    imports: [GridModule, DropDownListModule,  ]
})



export class ClientesProvTableComponent {
    @ViewChild('ddsample')
    public dropDown!: DropDownListComponent;
    @ViewChild('normalgrid')
    public grid?: GridComponent;

    public data!: Object[];
    public editSettings!: Object;
    public filterSettings!: Object;
    public toolbar: string[] = [];
    public orderidrules!: Object;
    public customeridrules!: Object;
    public freightrules!: Object;
    public editparams!: Object;
    public pageSettings!: Object;
    public formatoptions!: Object;
    public contextMenuItems!: ContextMenuItem[];
    public selectOptions!: Object;
    public viewchecks = signal(true);
    public clienteProveedorData!:string;
    constructor(private clienteProvService: ClienteProvService) {}
    clienteProveedorDataSource!: Object[];
    public seleccionActual:ClienteProv[] = [];
    public idsToDelete:number[]=[];

    public miEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('MiEmpresa') || "") || null;
    public actualEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('ActualEmpresa') || "") || null;

    public ngOnInit(): void {

        this.cargarClientes();

        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top', showAddNewRow: true};
        this.toolbar = ['[--Clientes/Proveedores--]','Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
        this.editparams = { params: { popupHeight: '300px' } };
        this.pageSettings = { pageCount: 10, pageSize: 16 };
        this.filterSettings = { type: 'Excel'};
        this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' }

        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
            'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
            'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
            'LastPage', 'NextPage'];
        this.selectOptions = { persistSelection: true,  };
    }

  async cargarClientes() {
    var clientesResp:any = await this.clienteProvService.getAllClientes();
    console.log('clientes recibidos', clientesResp);
    if (clientesResp){
      this.clienteProveedorData = JSON.stringify(clientesResp);
      this.clienteProveedorDataSource = JSON.parse(this.clienteProveedorData, (field: any, value: any) => {
      let dupValue: any = value;
      if (typeof value === 'string' && /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
          let arr: any = dupValue.split(/[^0-9]/);
          let arg: any = parseInt(arr[4], 10);
          let arg1: any = parseInt(arr[5], 10);
          value = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), arg, arg1);
      }
      return value;
    });
      this.data = this.clienteProveedorDataSource;
    }else{
      this.clienteProveedorData = JSON.stringify([]);
      this.clienteProveedorDataSource = JSON.parse(this.clienteProveedorData, (field: any, value: any) => {
      let dupValue: any = value;
      if (typeof value === 'string' && /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
          let arr: any = dupValue.split(/[^0-9]/);
          let arg: any = parseInt(arr[4], 10);
          let arg1: any = parseInt(arr[5], 10);
          value = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), arg, arg1);
      }
      return value;
    });
      this.data = this.clienteProveedorDataSource;
    }

  }

  async agregar(cliprov:ClienteProv) {
    if (!cliprov.id_empresa || cliprov.id_empresa === 0)
      cliprov.id_empresa = this.actualEmpresa?.id || 0;
    const clienteCreado = await this.clienteProvService.nuevoCliente(cliprov);
    //this.clienteProvService.push(clienteCreado);
    console.log('Respuesta de cliente agregado', clienteCreado);
    this.cargarClientes();
  }

  async editar(cliprov:ClienteProv) {
    const clienteEditado = await this.clienteProvService.editarCliente(cliprov.id || 0, cliprov);
    console.log('Respuesta de cliente editado', clienteEditado);
  }


  async eliminar(id?: number) {
    if (!id) return;
    await this.clienteProvService.eliminarCliente(id);
    //this.clientes = this.clientes.filter(c => c.id !== id);*/
  }

    public localFields: Object = { text: 'newRowPosition', value: 'id' };

    /*public onChange(e: ChangeEventArgs): void {
        let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
        (gridInstance.editSettings as any).newRowPosition = <NewRowPosition>this.dropDown.value;
        gridInstance.refresh();
    }*/

    /*actionBegin(args: any) :void {
        let gridInstance: any = (<any>document.getElementById('normalgrid')).ej2_instances[0];
        if (args.requestType === 'save') {
            if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
            } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
            }
        }
    }*/

     toolbarClick(args: any) {
          console.log('clicking', args)
          if (args.item.text === "Eliminar") {
            this.idsToDelete = this.seleccionActual ? [...this.seleccionActual.map(x => x.id || 0)] : [];
          }
       }

      public onContextMenuClick(args: ContextMenuClickEventArgs): void {
        const row = args.rowInfo?.rowData; // Datos de la fila sobre la que se hizo click

        switch (args.item.id) {
          case 'selImagen':
            //alert(`Detalle de: ${row?.Nombre} - Precio: ${row?.Precio}`);
            break;

          case 'nuevaCategoria':
            /*if (confirm(`¿Eliminar ${row?.Nombre}?`)) {
              this.data = this.data.filter(item => item.Id !== row?.Id);
            }*/
            break;
        }
      }

      public eventoOcurrido(ev:any, nombre:string){
        console.log('En evento action complete ' + nombre, ev);
        if (ev.action === "edit"){
          if (ev.requestType === "save"){
            this.editar(ev.data);
          }
        }
        if (ev.action === "add"){
          if (ev.requestType === "save"){
            this.agregar(ev.data);
          }
        }

        if (ev.type === "actionComplete"){
          if (ev.requestType === "delete"){

            console.log(this.seleccionActual, 'seleccion actual');

            if (this.idsToDelete && this.idsToDelete?.length > 0){
              Swal.fire({
                title: '¿Eliminar registros(s)?',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    this.idsToDelete.forEach( (idEl:number) => {
                        this.eliminar(idEl);
                      });
                      Swal.fire('Eliminado!', 'Registros fueron eliminado.', 'success');
                  } else {
                    this.cargarClientes();
                    Swal.fire('Los cambios no fueron guardados', '', 'info');
                  }
                });
              }
          }
        }
      }

      public select(ev:any){
          this.seleccionActual = this.grid?.getSelectedRecords() as ClienteProv[];
          console.log('Seleccionados:', this.seleccionActual);
        }

}

