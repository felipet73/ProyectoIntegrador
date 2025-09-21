
import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, signal } from '@angular/core';
import { SortService, GridModule, FilterService, IFilter, Column, GridComponent, Filter, ContextMenuItemModel, ContextMenuClickEventArgs } from '@syncfusion/ej2-angular-grids';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';


import { EditService, ToolbarService, PageService, NewRowPosition, PdfExportService } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ResizeService, ExcelExportService, ContextMenuService } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel,  SelectionService } from '@syncfusion/ej2-angular-grids';

import { ChipListModule, ClickEventArgs } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';
import { copy } from '@syncfusion/ej2-angular-spreadsheet';


export let productoDetail: Object[] = [
   {
       "id": 1,
       "nombre": "John",
       "precio_venta": 10.32,
       "precio_compra": 8.35,
       "id_categoria": 1,
       "categoria": "Granos",
       "codigo_barras": "9995555",
       "codigo_interno": "001",
       "id_empresa": 1,
       "sevende_por": "unidad",
       "maneja_intenarios": true,
       "maneja_multiprecios": true,
       "foto": "",
   },
   {
       "id": 2,
       "nombre": "Producto 2",
       "precio_venta": 10.32,
       "precio_compra": 8.35,
       "id_categoria": 1,
       "categoria": "Granos",
       "codigo_barras": "9995555",
       "codigo_interno": "001",
       "id_empresa": 1,
       "sevende_por": "unidad",
       "maneja_intenarios": true,
       "maneja_multiprecios": true,
       "foto": "",
   },
];






@Component({
    selector: 'product-table-component',
    templateUrl:'product-table.component.html',
    styleUrls: ['product-table.component.css'],
    providers: [SortService, FilterService, ToolbarService, EditService, PageService, SortService, FilterService, ResizeService, ExcelExportService, PdfExportService, ContextMenuService,  SelectionService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ GridModule,  ChipListModule, ]
})
export class ProducTableComponent {
    @ViewChild('grid')
    public grid?: GridComponent;
    public data!: Object[];
    public filterSettings!: Object;
    public filter?: IFilter;
    public dropInstance?: MultiSelect;


    public dropDown!: DropDownListComponent;
    public editSettings!: Object;
    public toolbar: string[] = [];
    public orderidrules!: Object;
    public customeridrules!: Object;
    public freightrules!: Object;
    public editparams!: Object;
    public pageSettings!: Object;
    public formatoptions!: Object;
    public contextMenuItems!: ContextMenuItemModel[]|ContextMenuItem[];
    public selectOptions!: Object;
    
    
    public viewchecks = signal(false);

    constructor() {

    }

    ngOnInit(): void {

        this.editSettings = {  allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top', /*showAddNewRow: true ,*/  mode: 'Dialog'};
        this.toolbar = ['[--Productos--]','Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'PdfExport', 'ExcelExport', 'CsvExport', '+ Categoria'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
        this.editparams = { params: { popupHeight: '300px' } };
        this.pageSettings = { pageCount: 5, pageSize: 9 };
        //this.filterSettings = { type: 'Excel'};
        this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' }

        this.contextMenuItems = [
            { text: '📄 Seleccionar Imagen ..', target: '.e-content', id: 'selImagen' },
            { text: '+ Categoria', target: '.e-content', id: 'nuevaCategoria' }
          ];
        //this.selectOptions = { persistSelection: true,  };
      
      
      this.data = productoDetail;
      
      this.filterSettings = {
            type: 'CheckBox',
            operators: {
                stringOperator: [
                    { value: 'contains', text: 'Contains' },
                    { value: 'doesnotcontain', text: 'Does Not Contains' },
                ],
            },
        },
        this.filter = {
            type: 'Menu',
            ui: {
                create: (args: { target: Element; column: object }) => {
                    const flValInput: HTMLElement = createElement('input', {
                        className: 'flm-input',
                    });
                    args.target.appendChild(flValInput);
                    let dropdownData: string[] = [
                        'Phone',
                        'Mouse',
                        'Laptop',
                        'Keyboard',
                        'Headset',
                        'Tablet',
                        'Projector',
                        'Printer',
                        'Calculator',
                    ];
                    this.dropInstance = new MultiSelect({
                        dataSource: dropdownData,
                        placeholder: 'Select a value',
                        popupHeight: '200px',
                        allowFiltering: true,
                        mode: 'Box',
                    });
                    this.dropInstance.appendTo(flValInput);
                },
                write: (args: any) => {
                    if (args.filteredValue && args.filteredValue.length > 0) {
                        (this.dropInstance as MultiSelect).value = args.filteredValue.split(', ');
                    }
                },
                read: (args: {
                    column: Column;
                    operator: string;
                    fltrObj: Filter;
                }) => {
                    (this.grid as GridComponent).removeFilteredColsByField(
                        args.column.field
                    );
                    if ((this.dropInstance as MultiSelect).value && (this.dropInstance as MultiSelect).value!.length!) {
                        args.fltrObj.filterByColumn(
                            args.column.field,
                            args.operator,
                            (this.dropInstance as MultiSelect).value!.sort().join(', ')
                        );
                    }
                },
            },
        }
    }

    public onChange(e: ChangeEventArgs): void {
            let gridInstance: any = (<any>document.getElementById('grid')).ej2_instances[0];
            (gridInstance.editSettings as any).newRowPosition = <NewRowPosition>this.dropDown.value;
            gridInstance.refresh();
        }

    actionBegin(args: any) :void {
        let gridInstance: any = (<any>document.getElementById('grid')).ej2_instances[0];
        if (args.requestType === 'save') {
            if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
            } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
            }
        }
    }

    toolbarClick(args: any) {
      console.log('clicking', args)
      if (args.item.text === "PDF Export") {
          this.grid?.pdfExport();
      }
      if (args.item.text === "Excel Export") {
          this.grid?.excelExport();
      }
      if (args.item.text === "CSV Export") {
          this.grid?.csvExport();
      }
      if (args.item.text === "+ Categoria") {
          alert('Nueva Categoria')
      }

  }

  public onContextMenuClick(args: ContextMenuClickEventArgs): void {
    const row = args.rowInfo?.rowData; // Datos de la fila sobre la que se hizo click
    alert(args.item.id)
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

}

