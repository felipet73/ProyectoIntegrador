
import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, signal } from '@angular/core';
import { SortService, GridModule, FilterService, IFilter, Column, GridComponent, Filter, ContextMenuItemModel, ContextMenuClickEventArgs } from '@syncfusion/ej2-angular-grids';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';

//import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';

import { EditService, ToolbarService, PageService, NewRowPosition, PdfExportService } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ResizeService, ExcelExportService, ContextMenuService } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel,  SelectionService } from '@syncfusion/ej2-angular-grids';

import { ChipListModule, ClickEventArgs } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';
import { copy } from '@syncfusion/ej2-angular-spreadsheet';
import { Categoria, Product } from '@products/interfaces/product.interface';
import Swal from 'sweetalert2';
import { ProductsService } from '@products/services/products.service';
import { Empresa } from '@store-front/components/interfaces/empresa.interface';
import { CategoriasService } from '@products/services/categoria.service';
import { map } from 'rxjs';


@Component({
    selector: 'product-table-component',
    templateUrl:'product-table.component.html',
    styleUrls: ['product-table.component.css'],
    providers: [SortService, FilterService, DropDownListComponent,DropDownListModule, ToolbarService, EditService, PageService, SortService, FilterService, ResizeService, ExcelExportService, PdfExportService, ContextMenuService,  SelectionService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ GridModule,  ChipListModule, ]
})
export class ProducTableComponent {
    @ViewChild('ddsample')
    public dropDown!: DropDownListComponent;
    @ViewChild('grid')
    public grid?: GridComponent;
    public data!: Object[];
    public filterSettings!: Object;
    public filter?: IFilter;
    public dropInstance?: MultiSelect;

    public editSettings!: Object;
    public toolbar: string[] = [];
    public orderidrules!: Object;
    public customeridrules!: Object;
    public freightrules!: Object;
    public editParams!: Object;
    public pageSettings!: Object;
    public formatoptions!: Object;
    public contextMenuItems!: ContextMenuItemModel[]|ContextMenuItem[];
    public selectOptions!: Object;

    public seleccionActual:Product[] = [];
    public idsToDelete:number[]=[];

    public viewchecks = signal(false);

    public miEmpresa:Empresa|null  = localStorage.getItem('MiEmpresa') ? (JSON.parse(localStorage.getItem('MiEmpresa') || "")):null;
    public actualEmpresa:Empresa|null  = localStorage.getItem('ActualEmpresa') ? (JSON.parse(localStorage.getItem('ActualEmpresa') || "")):null;


    constructor(private productoService: ProductsService,
      private categoriaService: CategoriasService
    ) {}
    //public categoria:number=0;

    public categorias: any[] = [];

    public estadoValueAccessor = (field: number, data: any, column: any) => {
      const estado = this.categorias.find(e => e.id_categoria === data[field]);
      return estado ? estado.text : '';
    };


    async ngOnInit()  {
        await this.cargarCategorias();
/*this.categorias = [
            { id_categoria: 1, nombre: "hola" },
            { id_categoria: 2, nombre: 'Granos' },
            { id_categoria: 3, nombre: "Frutas" }
          ];*/
        this.editSettings = {  allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top', /*showAddNewRow: true , */ mode: 'Dialog'};
        this.toolbar = ['[--Productos--]','Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'PdfExport', 'ExcelExport', 'CsvExport', '+ Categoria'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
        /*this.editParams = { params: {
                            dataSource: this.categorias,
                            fields: { value: 'id_categoria', text: 'nombre' },
                            placeholder: 'Seleccione Categoria' }
                          };*/

        this.pageSettings = { pageCount: 5, pageSize: 9 };
        //this.filterSettings = { type: 'Excel'};
        this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' }

        this.contextMenuItems = [
            { text: '📄 Seleccionar Imagen ..', target: '.e-content', id: 'selImagen' },
            { text: '+ Categoria', target: '.e-content', id: 'nuevaCategoria' }
          ];

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
        this.cargarProductos();
    }


    async cargarCategorias() {

      var categoriasResp:any = await this.categoriaService.getAllCategorias();
        console.log('categorias recibidas', categoriasResp);
        if (categoriasResp){
          this.categorias = categoriasResp.map((x:Categoria) => {
            return { id_categoria: x.id, text: x.nombre }
          })
          console.log('Asi queda categorias', this.categorias);
          this.editParams = { params: {
                            dataSource: this.categorias,
                            fields: { value: 'id_categoria', text: 'text' },
                            placeholder: 'Seleccione Categoria' }
                          };
        }else{
          this.categorias = [];
        }

    }

    async cargarProductos() {

      var productosResp:any = await this.productoService.getAllProductos();
        console.log('productos recibidos', productosResp);
        if (productosResp){
          this.data = productosResp;
        }else{
          this.data = [];
        }

    }

      async agregar(producto: Product) {
        if (!producto.id_empresa || producto.id_empresa === 0)
          producto.id_empresa = this.actualEmpresa?.id || 0;
        const productoCreado = await this.productoService.nuevoProucto(producto);
        console.log('Respuesta de producto agregado', productoCreado);
        this.cargarProductos();
      }

      async editar(producto:Product) {
        const productoEditado = await this.productoService.editarProducto(producto.id || 0, producto);
        console.log('Respuesta de producto editado', productoEditado);
      }


      async eliminar(id?: number) {
        if (!id) return;
        await this.productoService.eliminarProducto(id);
        //this.productos = this.productos.filter(c => c.id !== id);*/
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
      if (args.item.text === "Eliminar") {
            this.idsToDelete = this.seleccionActual ? [...this.seleccionActual.map(x => x.id || 0)] : [];
          }
      if (args.item.text === "+ Categoria") {
          //alert('Nueva Categoria')
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
                      //this.cargarProductos();
                      Swal.fire('Los cambios no fueron guardados', '', 'info');
                    }
                  });
                }
            }
          }
        }

        public select(ev:any){
            this.seleccionActual = this.grid?.getSelectedRecords() as Product[];
            console.log('Seleccionados:', this.seleccionActual);
          }

}

