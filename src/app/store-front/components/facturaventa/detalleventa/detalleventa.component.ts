import { CurrencyPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

import { OnInit, ViewChild } from '@angular/core';

import { EditService, ToolbarService, PageService, SortService, FilterService, NewRowPosition, GridModule, PdfExportService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ResizeService, ExcelExportService, ContextMenuService } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel,  SelectionService } from '@syncfusion/ej2-angular-grids';
import { ProductsService } from '@products/services/products.service';
import { CategoriasService } from '@products/services/categoria.service';
import { SharedService } from '@store-front/services/shared.service';
import { DetalleVenta, Venta } from '@store-front/components/interfaces/factura.interfaces';
import { DetalleVentaService } from '@store-front/services/detalleventa.service';
import Swal from 'sweetalert2';

/*
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

*/




@Component({
    selector: 'detalleventa-table',
    templateUrl: 'detalleventa.component.html',
    providers: [ToolbarService, EditService, PageService, SortService, FilterService, ResizeService, ExcelExportService, PdfExportService, ContextMenuService,  SelectionService],
    standalone: true,
    imports: [GridModule, DropDownListModule ]
})

export class DetalleVentaComponent {
   @ViewChild('grid')
    public grid!: GridComponent;
    @ViewChild('ddsample')
    public dropDown!: DropDownListComponent;
    //public data!: Object[];
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
    facturaActiva:Venta|null =null;

    dataDetalleFactura : DetalleVenta[]|null = null;



    public seleccionActual:DetalleVenta[] = [];
    public idsToDelete:number[]=[];


  public precioEditParams: object = {params: {decimals: 2,format: 'c2', step: 0.01,min: 0,placeholder: '$ 0.00'}};
  public precioEditParams1: object = {params: {decimals: 2,format: 'c2',step: 0.01,min: 0,readonly: true }};
  public precioEditParams2: object = {params: {readonly: true}};

  clienteProveedorData: string = JSON.stringify([
    /*{
        "id": 1,
        "id_venta": 1,
        "cantidad": 5,
        "precio_venta": 10.5,
        "total": 15.52,
        "descripcion": "Descripcion producto",
        "id_producto": 1,
        "codigo_barras": "1212121",
        "precio_compra": 15.5,
        "id_sucursal": 1,
        "estado": "Activo",
        "id_almacen": 1
    },*/
  ]);

  clienteProveedorDataSource: DetalleVenta[] = JSON.parse(this.clienteProveedorData, (field: any, value: any) => {
    let dupValue: any = value;
    if (typeof value === 'string' && /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*){1})([zZ]|([+\-])(\d\d):?(\d\d))?$/.test(value)) {
        let arr: any = dupValue.split(/[^0-9]/);
        let arg: any = parseInt(arr[4], 10);
        let arg1: any = parseInt(arr[5], 10);
        value = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10), parseInt(arr[3], 10), arg, arg1);
    }
    return value;
  });


    public localFields: Object = { text: 'newRowPosition', value: 'id' };

    constructor(private productoService: ProductsService,
          private categoriaService: CategoriasService, private shared: SharedService, private ventaDetalleService:DetalleVentaService  )
          {}

    public actionBegin = (args: any) => {





        /*console.log(args, 'action begoin');
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
          // Busca el input del campo productoId
          setTimeout(() => {
            const input = document.querySelector('input.e-field[aria-label="codigo_barras"]') as HTMLInputElement;
            console.log(input, 'como eta input');
            if (input) {
              input.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                  const value = input.value;
                  const rowIndex = this.grid?.getRowInfo(input).rowIndex;
                  const record:any = this.grid?.currentViewData[rowIndex!];
                  record!.descripcion = 'hola';
                  this.grid!.updateRow(rowIndex!, record!);
                  /*if (this.descripcion[value]) {

                    const rowIndex = this.grid.getRowInfo(input).rowIndex;
                    const record = this.grid.currentViewData[rowIndex];

                    // Actualizo campos
                    record.descripcion = this.productos[value].descripcion;
                    record.precio = this.productos[value].precio;

                    // Refrescar la celda para que se vea el cambio
                    this.grid.updateRow(rowIndex, record);
                  }
                }
              });
            }
          });
        }*/

      // let gridInstance: any = (<any>document.getElementById('grid')).ej2_instances[0];
      //   if (args.requestType === 'save') {
      //       if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
      //           args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
      //       } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
      //           args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
      //       }
      //   }
    }

//

 calcularFactura(){
  var Subtotal = 0;
  const allData = (this.grid.dataSource as any[]);
  console.log(allData, 'All data grid');

  if (allData){
    allData?.forEach(el => Subtotal+=el.total);
    this.shared.updatecantProductos(allData?.length);
    this.shared.updateSubTotal(Subtotal);
    this.shared.updateDescuento(0.00);
    this.shared.updateImpuesto(( Subtotal*0.12 ));
    this.shared.updateTotal(Subtotal+Subtotal*0.12);
  }


 }

public edit = async (args: any) => {
  console.log('editing******',args);
  if (args.key === 'Enter' && args.target.name ==='codigo_barras'){
     const formElement = args.srcElement.form as HTMLElement;
      // Buscar el input de la columna que nos interesa (ej: cantidad o precio)
      const codigoBarrasInput = formElement.querySelector('input[name="codigo_barras"]') as HTMLInputElement;
      const id_productoInput = formElement.querySelector('input[name="id_producto"]') as HTMLInputElement;
      const cantidadInput = formElement.querySelector('input[name="cantidad"]') as HTMLInputElement;
      const precioInput = formElement.querySelector('input[name="precio_venta"]') as HTMLInputElement;
      const descripcionInput   = formElement.querySelector('input[name="descripcion"]') as HTMLInputElement;
      const totalInput   = formElement.querySelector('input[name="total"]') as HTMLInputElement;

      if (codigoBarrasInput.value !=''){
        const respProd = await this.productoService.getProductoPorCodigoBarras(codigoBarrasInput.value);
        console.log(respProd , 'respusta codigo de barras')
        if (respProd){
          descripcionInput.value = respProd.nombre;
          id_productoInput.value = respProd.id.toString();
          precioInput.value = respProd.precio_venta.toString();
          cantidadInput.focus();
          cantidadInput.select();
        }
        if (cantidadInput.value != '' && precioInput.value != '')
          totalInput.value = (respProd?.precio_venta || 0 * Number(cantidadInput.value)).toFixed(2).toString();
      }
      setTimeout(() => {
          this.calcularFactura();  
      }, 2600);
      
  }

  if (args.key === 'Enter' && args.target.name ==='cantidad'){
      const formElement = args.srcElement.form as HTMLElement;
      // Buscar el input de la columna que nos interesa (ej: cantidad o precio)
      const codigoBarrasInput = formElement.querySelector('input[name="codigo_barras"]') as HTMLInputElement;
      const id_productoInput = formElement.querySelector('input[name="id_producto"]') as HTMLInputElement;
      const cantidadInput = formElement.querySelector('input[name="cantidad"]') as HTMLInputElement;
      const precioInput = formElement.querySelector('input[name="precio_venta"]') as HTMLInputElement;
      const descripcionInput   = formElement.querySelector('input[name="descripcion"]') as HTMLInputElement;
      const totalInput   = formElement.querySelector('input[name="total"]') as HTMLInputElement;
      console.log('cantidad y precio', cantidadInput.value , precioInput.value)
        if (cantidadInput.value != '' && precioInput.value != '')
          totalInput.value = (Number(precioInput.value) * Number(cantidadInput.value)).toFixed(2).toString();
      console.log('cantidad y precio', Number(precioInput.value) , Number(cantidadInput.value))
      setTimeout(() => {
        this.calcularFactura();  
      }, 2600);
      
  }


  /*if (args.columnName === 'codigo_barras') {
    const input = args.element.querySelector('input') as HTMLInputElement;
    input.addEventListener('keyup', () => {
      const fila = args.rowData as any;
      const cantidad = +fila.cantidad || 0;
      const precio = +fila.precio || 0;
      fila.total = cantidad * precio;
    });
    this.grid.refresh();
  }*/
}




    public onChange(e: ChangeEventArgs): void {
        let gridInstance: any = (<any>document.getElementById('grid')).ej2_instances[0];
        (gridInstance.editSettings as any).newRowPosition = <NewRowPosition>this.dropDown.value;
        gridInstance.refresh();
    }


    async cargarDetalle() {
      var detalleResp:any = await this.ventaDetalleService.getDetalleVentaPorId( this.facturaActiva?.id || 0);
        console.log('etalle venta recibidos', detalleResp);
        if (detalleResp){
          this.dataDetalleFactura = detalleResp;
        }else{
          this.dataDetalleFactura = null;
        }
    }

    async agregar(detalle: DetalleVenta) {
        detalle.id_venta = this.facturaActiva?.id || 1;
        const detalleCreado = await this.ventaDetalleService.nuevoDetalleVenta(detalle);
        console.log('Respuesta de detalle venta agregado', detalleCreado);
        this.cargarDetalle();
      }

      async editar(detalle:DetalleVenta) {
        const detalleEditado = await this.ventaDetalleService.editarDetalleVenta(detalle.id || 0, detalle);
        console.log('Respuesta de detalle editado', detalleEditado);
      }


      async eliminar(id?: number) {
        if (!id) return;
        await this.ventaDetalleService.eliminarDetalleVenta(id);
        //this.productos = this.productos.filter(c => c.id !== id);*/
      }


    ngOnInit() {

        this.shared.facturaActiva$.subscribe(valor2 => {this.facturaActiva = valor2;});
        this.shared.detalleActivo$.subscribe(valor2 => {this.dataDetalleFactura = valor2;});
       //Si tengo factura activa cargo el detalle
        //if (this.facturaActiva!=null){
          //alert(1)
          setTimeout(async ()=>{
            console.log('Detalle de venta.....', this.facturaActiva?.id)
            try {
              var respdetalle:any = await this.ventaDetalleService.getDetalleVentaPorId(this.facturaActiva?.id || 0);
              console.log('Detalle de venta',respdetalle)
              if (respdetalle){
                this.dataDetalleFactura = respdetalle;
                setTimeout(() => {
                  this.calcularFactura();
                }, 2000);

              }
            } catch (error) {
              console.log('No hay detalle de venta')
              this.dataDetalleFactura = null;
            }
          },2000)
        //}
        this.dataDetalleFactura = this.clienteProveedorDataSource;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top', showAddNewRow: true};
        this.toolbar = ['[--Detalle de Factura--]','Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
        this.editparams = { params: { popupHeight: '300px' } };
        this.pageSettings = { pageCount: 10, pageSize: 6 };
        this.filterSettings = { type: 'Excel'};
        this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' }

        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
            'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
            'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
            'LastPage', 'NextPage'];
        this.selectOptions = { persistSelection: true,  };







    }



    public eventoOcurrido(ev:any, nombre:string){
              console.log('En evento action complete ' + nombre, ev);
              if (ev.action === "edit"){
                if (ev.requestType === "save"){
                  this.editar(ev.data);
                  this.calcularFactura();
                }
              }
              if (ev.action === "add"){
                if (ev.requestType === "save"){
                  this.agregar(ev.data);
                  this.calcularFactura();
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
                              this.calcularFactura();
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
                this.seleccionActual = this.grid?.getSelectedRecords() as DetalleVenta[];
                console.log('Seleccionados:', this.seleccionActual);
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

}

