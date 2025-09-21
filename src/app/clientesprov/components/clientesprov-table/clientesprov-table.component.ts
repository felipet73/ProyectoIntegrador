import { CurrencyPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

import { OnInit, ViewChild } from '@angular/core';

import { EditService, ToolbarService, PageService, SortService, FilterService, NewRowPosition, GridModule, PdfExportService } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ResizeService, ExcelExportService, ContextMenuService } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel,  SelectionService } from '@syncfusion/ej2-angular-grids';


let clienteProveedorData: string = JSON.stringify([
    {
        "id": 1,
        "nombres": "Nombres",
        "id_empresa": "5",
        "direccion": "Direccion",
        "telefono": "00245454",
        "email": "email@email.com",
        "identintificador_fiscal": "0103576575",
        "tipo": "CLIENTE",
        "estado": 'Activo',
        "fecha_registro": "1996-07-04T10:10:00.000Z"
    },
    {
        "id": 2,
        "nombres": "Nombres",
        "id_empresa": "5",
        "direccion": "Direccion",
        "telefono": "00245454",
        "email": "email@email.com",
        "identintificador_fiscal": "",
        "tipo": "PROVEEDOR",
        "estado": 'Activo',
        "fecha_registro": "1996-07-04T10:10:00.000Z"
    }
]);

export const clienteProveedorDataSource: Object[] = JSON.parse(clienteProveedorData, (field: any, value: any) => {
    let dupValue: any = value;
    if (typeof value === 'string' && /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
        let arr: any = dupValue.split(/[^0-9]/);
        let arg: any = parseInt(arr[4], 10);
        let arg1: any = parseInt(arr[5], 10);
        value = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), arg, arg1);
    }
    return value;
});


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


    public ngOnInit(): void {
        this.data = clienteProveedorDataSource;
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

    // public newRowPosition: { [key: string]: Object }[] = [
    //     { id: 'Top', newRowPosition: 'Top' },
    //     { id: 'Bottom', newRowPosition: 'Bottom' }
    // ];
    public localFields: Object = { text: 'newRowPosition', value: 'id' };

    public onChange(e: ChangeEventArgs): void {
        let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
        (gridInstance.editSettings as any).newRowPosition = <NewRowPosition>this.dropDown.value;
        gridInstance.refresh();
    }

    actionBegin(args: any) :void {
        let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
        if (args.requestType === 'save') {
            if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
            } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
                args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
            }
        }
    }
}

