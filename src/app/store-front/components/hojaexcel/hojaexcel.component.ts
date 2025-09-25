import { inject, NgModule, ViewChild } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons'
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet'
import { L10n } from '@syncfusion/ej2-base';


import { Component } from '@angular/core';
import { SpreadsheetComponent, BeforeSaveEventArgs, BeforeOpenEventArgs } from '@syncfusion/ej2-angular-spreadsheet';
import { SupabaseService } from '../../../supabase/supabase.service';
import { ClienteProvService } from 'src/app/clientesprov/services/clienteprov.service';
import { SharedService } from '@store-front/services/shared.service';
import { VentasService } from '@store-front/services/ventas.service';
import { EmpresasService } from '@store-front/services/empresas.service';
import { Empresa } from '../interfaces/empresa.interface';
import { AuthService } from '@auth/services/auth.service';
import { DetalleVentaService } from '@store-front/services/detalleventa.service';
import { ProductsService } from '@products/services/products.service';
import { ClienteProv } from 'src/app/clientesprov/interfaces/clienteprov.interface';
import { Venta } from '../interfaces/factura.interfaces';


L10n.load({
    'es-ES': {
        'spreadsheet': {
            'Cut': 'Cortar',
            'Copy': 'Copiar',
            'Paste': 'Pegar',
            'PasteValues': 'Pegar valores',
            'PasteSpecial': 'Pegado especial',
            'Filter': 'Filtrar',
            'FilterContent': 'Mostrar solo las filas que cumplen los criterios que especifique.',
            'FilterByValue': 'Filtrar por valor',
            'FilterByCondition': 'Filtrar por condición',
            'Sort': 'Ordenar',
            'Clear': 'Limpiar filtro',
            'NumberFormat': 'Formato de número',
            'Currency': 'Moneda',
            'Accounting': 'Contabilidad',
            'ShortDate': 'Fecha corta',
            'LongDate': 'Fecha larga',
            'Time': 'Hora',
            'Percentage': 'Porcentaje',
            'MoreNumberFormats': 'Más formatos de número',
            'All': 'Todo',
            'Number': 'Número',
            'General': 'General',
            'CurrencyFormat': 'Moneda',
            'AccountingFormat': 'Contabilidad',
            'ShortDateFormat': 'Fecha corta',
            'LongDateFormat': 'Fecha larga',
            'TimeFormat': 'Hora',
            'PercentageFormat': 'Porcentaje',
            'Custom': 'Personalizado',
            'Edit': 'Editar',
            'FindReplace': 'Buscar y reemplazar',
            'Find': 'Buscar',
            'Replace': 'Reemplazar',
            'ReplaceAll': 'Reemplazar todo',
            'GoTo': 'Ir a',
            'GoToName': 'Ir a nombre',
            'Reference': 'Referencia',
            'Special': 'Especial',
            'Formulas': 'Fórmulas',
            'InsertFunction': 'Insertar función',
            'AutoSum': 'Autosuma',
            'RecentlyUsed': 'Usados recientemente',
            'Financial': 'Financiero',
            'Logical': 'Lógico',
            'Text': 'Texto',
            'DateAndTime': 'Fecha y hora',
            'LookupAndReference': 'Búsqueda y referencia',
            'MathAndTrigonometry': 'Matemáticas y trigonometría',
            'MoreFunctions': 'Más funciones',
            'ShowHide': 'Mostrar / Ocultar',
            'HideRows': 'Ocultar filas',
            'HideColumns': 'Ocultar columnas',
            'UnhideRows': 'Mostrar filas',
            'UnhideColumns': 'Mostrar columnas',
            'ProtectSheet': 'Proteger hoja',
            'ProtectSheetContent': 'Evite que otros usuarios modifiquen el contenido de la hoja de cálculo.',
            'UnprotectSheet': 'Desproteger hoja',
            'Insert': 'Insertar',
            'InsertContent': 'Agregue nuevas celdas, filas o columnas a la hoja de cálculo.',
            'InsertCells': 'Insertar celdas',
            'InsertRows': 'Insertar filas',
            'InsertColumns': 'Insertar columnas',
            'InsertRow': 'Insertar fila',
            'Above':'Arriba',
            'Below':'Abajo',
            'DeleteRow':'Borrar fila',
            'HideRow':'Ocultar fila',
            'Delete': 'Eliminar',
            'DeleteContent': 'Elimine celdas, filas o columnas de la hoja de cálculo.',
            'DeleteCells': 'Eliminar celdas',
            'DeleteRows': 'Eliminar filas',
            'DeleteColumns': 'Eliminar columnas',
            'ClearContents': 'Borrar contenidos',
            'ClearContent': 'Borre el contenido de las celdas seleccionadas sin eliminar las celdas.',
            'ClearFormats': 'Borrar formatos',
            'ClearHyperlinks': 'Borrar hipervínculos',
            'AutoFit': 'Ajuste automático',
            'AutoFitContent': 'Ajuste automático del ancho de la columna para que se ajuste al contenido más amplio de la columna.',
            'AutoFitSelection': 'Ajuste automático del ancho de la columna para que se ajuste al contenido más amplio de la selección.',
            'Formattings': 'Formatos',
            'CellFormatting': 'Formato de celda',
            'ConditionalFormatting': 'Formato condicional',
            'CellStyle': 'Estilo de celda',
            'CellStyleContent': 'Aplicar un estilo predefinido a las celdas para mejorar la apariencia de la hoja de cálculo.',
            'FormatAsTable': 'Dar formato como tabla',
            'FormatAsTableContent': 'Convierta rápidamente un rango de celdas en una tabla con su propio estilo.',
            'TableStyleOptions': 'Opciones de estilo de tabla',
            'HeaderRow': 'Fila de encabezado',
            'TotalRow': 'Fila total',
            'BandedRows': 'Filas con bandas',
            'BandedColumns': 'Columnas con bandas',
            'FirstColumn': 'Primera columna',
            'LastColumn': 'Última columna',
            'ResizeTable': 'Cambiar tamaño de tabla',
            'ConvertToRange': 'Convertir a rango',
            'SortTable': 'Ordenar tabla',
            'FilterTable': 'Filtrar tabla',
            'ClearTable': 'Borrar tabla',
            'TableContent': 'Elimine el formato de tabla sin eliminar los datos.',
            'Charts': 'Gráficos',
            'RecommendedCharts': 'Gráficos recomendados',
            'InsertChart': 'Insertar gráfico',
            'ChartContent': 'Inserte un gráfico para representar visualmente los datos seleccionados.',
            'PivotTable': 'Tabla dinámica',
            'PivotTableContent': 'Resuma y analice datos complejos en una tabla dinámica.',
            'AddToDataModel': 'Agregar al modelo de datos',
            'AddToDataModelContent': 'Agregue los datos de la tabla al modelo de datos del libro.',
            'Sparklines': 'Minigráficos',
            'SparklineContent': 'Inserte un minigráfico en una celda para representar visualmente los datos.',
            'Line': 'Línea',
            'Column': 'Columna',
            'WinLoss': 'Ganancia/Pérdida',
            'Design': 'Diseño',
            'SparklineDesign': 'Diseño de minigráficos',
            'EditData': 'Editar datos',
            'EditDataContent': 'Cambie el rango de datos utilizado para crear el minigráfico.',
            'SparklineColor': 'Color del minigráfico',
            'SparklineColorContent': 'Cambie el color del marcador de alto, bajo, negativo y primer punto del minigráfico.',
            'MarkerColor': 'Color del marcador',
            'HighPoint': 'Punto alto',
            'LowPoint': 'Punto bajo',
            'NegativePoint': 'Punto negativo',
            'FirstPoint': 'Primer punto',
            'LastPoint': 'Último punto',
            'Axis': 'Eje',
            'AxisContent': 'Mostrar u ocultar el eje vertical en el minigráfico.',
            'DeleteSparkline': 'Eliminar minigráfico',
            'DeleteSparklineContent': 'Elimine el minigráfico seleccionado de la celda.',
            'File': 'Archivo',
            'New': 'Nuevo',
            'NewContent': 'Cree un libro nuevo.',
            'Open': 'Abrir',
            'OpenContent': 'Abra un libro existente desde su dispositivo o desde la nube.',
            'OpenRecent': 'Abrir reciente',
            'Save': 'Guardar',
            'SaveContent': 'Guarde el libro actual en su dispositivo o en la nube.',
            'SaveAs': 'Guardar como',
            'SaveAsContent': 'Guarde el libro actual con un nombre o en una ubicación diferente.',
            'Print': 'Imprimir',
            'PrintContent': 'Imprima el libro actual.',
            'PrintSelection': 'Imprimir selección',
            'PrintSelectionContent': 'Imprima solo la selección actual en la hoja de cálculo.',
            'PageSetup': 'Configurar página',
            'PageSetupContent': 'Establezca opciones de diseño para la impresión del libro, como márgenes, orientación y tamaño del papel.',
            'ShowAll': 'Mostrar todo',
            'ShowAllContent': 'Mostrar todas las filas y columnas ocultas en la hoja de cálculo.',
            'FindSelect': 'Buscar y seleccionar',
            'FindSelectContent': 'Encuentre texto específico en el libro o seleccione celdas que cumplan ciertos criterios.',
            'GoToSpecial': 'Ir a especial',
            'GoToSpecialContent': 'Seleccione rápidamente celdas que cumplan ciertos criterios, como celdas con fórmulas o comentarios.',
            'Comments': 'Comentarios',
            'NewComment': 'Nuevo comentario',
            'NewCommentContent': 'Agregue un comentario a la celda seleccionada.',
            'DeleteComment': 'Eliminar comentario',
            'DeleteCommentContent': 'Elimine el comentario de la celda seleccionada.',
            'ShowComments': 'Mostrar comentarios',
            'ShowCommentsContent': 'Muestre todos los comentarios en la hoja de cálculo.',
            'HideComments': 'Ocultar comentarios',
            'HideCommentsContent': 'Oculte todos los comentarios en la hoja de cálculo.',
            'EditComment': 'Editar comentario',
            'EditCommentContent': 'Edite el comentario de la celda seleccionada.',
            'Next': 'Siguiente',
            'NextContent': 'Vaya al siguiente comentario en la hoja de cálculo.',
            'Previous': 'Anterior',
            'PreviousContent': 'Vaya al comentario anterior en la hoja de cálculo.',
            'ShowHideComments': 'Mostrar/ocultar comentarios',
            'ShowHideCommentsContent': 'Mostrar u ocultar los comentarios de la celda seleccionada.',
            'ProtectWorkbook': 'Proteger libro',
            'ProtectWorkbookContent': 'Evite que otros usuarios agreguen, muevan, eliminen o oculten hojas en el libro.',
            'UnprotectWorkbook': 'Desproteger libro',
            'AutoCalculate': 'Calculo automático',
            'AutoCalculateContent': 'Mostrar el resultado de funciones comunes en la barra de estado al seleccionar un rango de celdas.',
            'Sum': 'Suma',
            'Average': 'Promedio',
            'CountNums': 'Contar números',
            'Count': 'Contar',
            'Max': 'Máx',
            'Min': 'Mín',
            'Cell': 'Celda',
            'CellContent': 'Cambie la altura de la fila y el ancho de la columna, inserte o elimine celdas, o busque celdas específicas en la hoja de cálculo.',
            'Row': 'Fila',
            'RowContent': 'Agregue, elimine o oculte filas, o cambie la altura de la fila en la hoja de cálculo.',
            'ColumnContent': 'Agregue, elimine oculte columnas, o cambie el ancho de la columna en la hoja de cálculo.',
            'Hide': 'Ocultar',
            'HideContent': 'Oculte las filas o columnas seleccionadas en la hoja de cálculo.',
            'Unhide': 'Mostrar',
            'UnhideContent': 'Muestre las filas o columnas seleccionadas en la hoja de cálculo.',
            'Height': 'Altura',
            'HeightContent': 'Cambie la altura de la fila seleccionada en la hoja de cálculo.',
            'Width': 'Ancho',
            'WidthContent': 'Cambie el ancho de la columna seleccionada en la hoja de cálculo.',
            'InsertHyperlink': 'Insertar hipervínculo',
            'InsertHyperlinkContent': 'Inserte un hipervínculo en la celda seleccionada para acceder rápidamente a un archivo, página web u otra ubicación.',
            'EditHyperlink': 'Editar hipervínculo',
            'EditHyperlinkContent': 'Edite el hipervínculo de la celda seleccionada para cambiar la dirección o el texto para mostrar.',
            'RemoveHyperlink': 'Quitar hipervínculo',
            'RemoveHyperlinkContent': 'Elimine el hipervínculo de la celda seleccionada sin eliminar el texto.',
            'OpenHyperlink': 'Abrir hipervínculo',
            'OpenHyperlinkContent': 'Abra el destino del hipervínculo de la celda seleccionada.',
            'Reapply': 'Volver a aplicar',
            'ReapplyContent': 'Vuelva a aplicar el filtro y el orden a los datos filtrados.',
            'DataValidation': 'Validación de datos',
            'DataValidationContent': 'Restringe el tipo de datos o los valores que los usuarios pueden ingresar en una celda.',
            'ClearValidation': 'Borrar validación',
            'ClearValidationContent': 'Elimine las reglas de validación de datos de las celdas seleccionadas.',
            'CircleInvalidData': 'Marcar datos no válidos',
            'CircleInvalidDataContent': 'Marque las celdas que contienen datos no válidos con un círculo rojo para identificarlas fácilmente.',
            'HighlightChanges': 'Resaltar cambios',
            'HighlightChangesContent': 'Resalte las celdas que han cambiado desde la última vez que se guardó el libro.',
            'FindInvalidData': 'Buscar datos no válidos',
            'FindInvalidDataContent': 'Busque y seleccione las celdas que contienen datos no válidos en la hoja de cálculo.',
            'Settings': 'Configuraciones',
            'SettingsContent': 'Personalice las opciones de la hoja de cálculo, como la configuración de la vista, las opciones de edición y las preferencias de cálculo.',
            'Form': 'Formulario',
            'FormContent': 'Cree un formulario para facilitar la entrada de datos en la hoja de cálculo.',
            'AddNew': 'Agregar nuevo',
            'AddNewContent': 'Agregue un nuevo registro al final del rango de datos.',
            'EditRecord': 'Editar registro',
            'EditRecordContent': 'Edite el registro seleccionado en el formulario.',
            'DeleteRecord': 'Eliminar registro',
            'DeleteRecordContent': 'Elimine el registro seleccionado del rango de datos.',
            'SaveRecord': 'Guardar registro',
            'SaveRecordContent': 'Guarde los cambios realizados en el registro del formulario.',
            'Cancel': 'Cancelar',
            'CancelContent': 'Cancele los cambios realizados en el registro del formulario.',
            'FindPrev': 'Buscar anterior',
            'FindPrevContent': 'Busque el registro anterior que coincida con los criterios de búsqueda.',
            'FindNext': 'Buscar siguiente',
            'FindNextContent': 'Busque el siguiente registro que coincida con los criterios de búsqueda.',
            'NoRecords': 'No se encontraron registros',
            'NoRecordsContent': 'No se encontraron registros que coincidan con los criterios de búsqueda.',
            'FilterByForm': 'Filtrar por formulario',
            'FilterByFormContent': 'Filtre los registros en el rango de datos utilizando el formulario.',
            'ClearForm': 'Borrar formulario',
            'ClearFormContent': 'Borre todos los campos en el formulario para ingresar nuevos criterios de búsqueda.',
            'SortAscending': 'Ordenar de A a Z',
            'SortAscendingContent': 'Ordene los datos seleccionados en orden ascendente, de A a Z o de menor a mayor.',
            'SortDescending': 'Ordenar de Z a A',
            'SortDescendingContent': 'Ordene los datos seleccionados en orden descendente, de Z a A o de mayor a menor.',
            'CustomSort': 'Orden personalizado',
            'CustomSortContent': 'Ordene los datos seleccionados utilizando múltiples niveles y criterios personalizados.',
            'SortByColor': 'Ordenar por color',
            'SortByColorContent': 'Ordene las celdas seleccionadas según el color de relleno o el color de fuente.',
            'SortByCellColor': 'Ordenar por color de celda',
            'SortByFontColor': 'Ordenar por color de fuente',
            'SortByIcon': 'Ordenar por icono',
            'SortByIconContent': 'Ordene las celdas seleccionadas según el icono de conjunto de iconos.',
            'FilterByColor': 'Filtrar por color',
            'FilterByColorContent': 'Filtre las celdas seleccionadas según el color de relleno o el color de fuente.',
            'FilterByCellColor': 'Filtrar por color de celda',
            'FilterByFontColor': 'Filtrar por color de fuente',
            'FilterByIcon': 'Filtrar por icono',
            'FilterByIconContent': 'Filtre las celdas seleccionadas según el icono de conjunto de iconos.',
            'ClearFilter': 'Borrar filtro',
            'ClearFilterContent': 'Elimine los filtros aplicados a las celdas seleccionadas.',
            'Reorder': 'Reordenar',
            'ReorderContent': 'Cambie el orden de las hojas en el libro de trabajo arrastrándolas a una nueva posición.',
            'Rename': 'Cambiar nombre',
            'RenameContent': 'Cambie el nombre de la hoja seleccionada en el libro de trabajo.',
            'MoveOrCopy': 'Mover o copiar',
            'MoveOrCopyContent': 'Mueva o copie la hoja seleccionada a otra ubicación en el mismo libro de trabajo u otro libro de trabajo.',
            'MoveToEnd': 'Mover al final',
            'MoveToEndContent': 'Mueva la hoja seleccionada al final del libro de trabajo.',
            'AddNewSheet': 'Agregar nueva hoja',
            'AddNewSheetContent': 'Agregue una nueva hoja al libro de trabajo.',
            'DeleteSheet': 'Eliminar hoja',
            'DeleteSheetContent': 'Elimine la hoja seleccionada del libro de trabajo.',
            'Sheet': 'Hoja',
            'SheetContent': 'Navegue, agregue, elimine o administre las hojas en el libro de trabajo.',
            'Workbook': 'Libro',
            'WorkbookContent': 'Administre las hojas y la configuración del libro de trabajo.',
            'ShowFormulas': 'Mostrar fórmulas',
            'ShowFormulasContent': 'Muestre las fórmulas en las celdas en lugar de los resultados calculados.',
            'ShowGridLines': 'Mostrar líneas de cuadrícula',
            'ShowGridLinesContent': 'Muestre o oculte las líneas de cuadrícula en la hoja de cálculo.',
            'ShowHeadings': 'Mostrar encabezados',
            'ShowHeadingsContent': 'Muestre u oculte los encabezados de fila y columna en la hoja de cálculo.',
            'FreezePanes': 'Inmovilizar paneles',
            'FreezePanesContent': 'Inmovilice filas y columnas específicas en la hoja de cálculo para que permanezcan visibles mientras se desplaza por el resto de la hoja.',
            'UnfreezePanes': 'Desinmovilizar paneles',
            'UnfreezePanesContent': 'Desactive la inmovilización de filas y columnas en la hoja de cálculo.',
            'FreezeTopRow': 'Inmovilizar fila superior',
            'FreezeTopRowContent': 'Inmovilice la fila superior en la hoja de cálculo para que permanezca visible mientras se desplaza hacia abajo.',
            'FreezeFirstColumn': 'Inmovilizar primera columna',
            'FreezeFirstColumnContent': 'Inmovilice la primera columna en la hoja de cálculo para que permanezca visible mientras se desplaza hacia la derecha.',
            'Split': 'Dividir',
            'SplitContent': 'Divida la hoja de cálculo en múltiples paneles que se desplazan de forma independiente.',
            'Gridlines': 'Líneas de cuadrícula',
            'Headings': 'Encabezados',
            'ProtectedSheet': 'Hoja protegida',
            'ProtectedSheetContent': 'No se permiten cambios. Desactive la protección de la hoja para realizar cambios.',
            'OK': 'Aceptar',
            'Apply': 'Aplicar',
            'SelectAll': 'Seleccionar todo',
            'Blanks': 'Celdas en blanco',
            'Constants': 'Constantes',
            'ConditionalFormats': 'Formatos condicionales',
            'Select': 'Seleccionar celdas',
            'SelectContent': 'Seleccione rápidamente todas las celdas en la hoja de cálculo que cumplan ciertos criterios.',
            'GoToContent': 'Vaya rápidamente a una celda específica o a un rango de celdas en la hoja de cálculo.',
            'Data': 'Datos',
            'DataContent': 'Herramientas para administrar y manipular datos en la hoja de cálculo.',
            'Connections': 'Conexiones',
            'ConnectionsContent': 'Administre las conexiones de datos externas y actualice los datos en la hoja de cálculo.',
            'RefreshAll': 'Actualizar todo',
            'RefreshAllContent': 'Actualice todas las conexiones de datos externas y los datos en la hoja de cálculo.',
            'ClearAll': 'Borrar todo',
            'ClearAllContent': 'Elimine todas las conexiones de datos externas y los datos en la hoja de cálculo.',
            'ConnectionsDialogTitle': 'Conexiones de libro',
            'ConnectionsDialogContent': 'Administre las conexiones de datos externas en el libro de trabajo.',
            'AddConnection': 'Agregar conexión',
            'AddConnectionContent': 'Agregue una nueva conexión de datos externa al libro de trabajo.',
            'EditConnection': 'Editar conexión',
            'View': 'Vista',
            'ViewContent': 'Opciones para cambiar la vista de la hoja de cálculo y el libro de trabajo.',
            'Macros': 'Macros',
            'MacrosContent': 'Grabe, ejecute y administre macros para automatizar tareas repetitivas en la hoja de cálculo.',
            'RecordMacro': 'Grabar macro',
            'RecordMacroContent': 'Grabe una serie de acciones en la hoja de cálculo para reproducirlas más tarde como una macro.',
            'UseRelativeReferences': 'Usar referencias relativas',
            'UseRelativeReferencesContent': 'Grabe la macro utilizando referencias de celda relativas en lugar de referencias absolutas.',
            'StopRecording': 'Detener grabación',
            'StopRecordingContent': 'Detenga la grabación de la macro.',
            'VisualBasicEditor': 'Editor de Visual Basic',
            'Before':'Antes',
            'After':'Después'
        }
    }
});



@Component({
imports: [
        DropDownButtonModule,
        SpreadsheetAllModule
    ],

standalone: true,
    selector: 'hojaexcel-container',
    template: `<ejs-spreadsheet #spreadsheet locale='es-ES' height="90vh" (beforeOpen)='beforeOpen($event)' openUrl='https://services.syncfusion.com/angular/production/api/spreadsheet/open' allowOpen='true' [allowSave]="true" saveUrl='http://localhost:3000/save' (beforeSave)="beforeSave($event)" > </ejs-spreadsheet>`
})
export class HojaExcelComponent {
    @ViewChild('spreadsheet') public spreadsheet!: SpreadsheetComponent;

  public miEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('MiEmpresa') || "") || null;
  public actualEmpresa:Empresa|null  = JSON.parse(localStorage.getItem('ActualEmpresa') || "") || null;

  authService = inject(AuthService);
  constructor(private clienteServicio:ClienteProvService, private shared: SharedService, private ventaService:VentasService,
        private empresaServicio:EmpresasService, private ventaDetalleServicio:DetalleVentaService, private productoServicio:ProductsService
      ) {  }

    //ejecutar al inicializar el componente
    async ngOnInit() {

      //cargar todos los clietes
      let allClientes = await this.clienteServicio.getAllClientes();
      console.log('clientes', allClientes);
      
      setTimeout(() => {
        console.log(allClientes?.map(c => [c.identificador_fiscal, c.nombres, c.email, c.direccion, c.telefono]), 'mapeado');
        this.spreadsheet.sheets[0].name = 'Nueva Hoja';
                  
        this.spreadsheet.insertSheet([{ index: 0, name: 'ClientesProveedores' }]);
          var toadd = allClientes?.map(c => [c.identificador_fiscal, c.nombres, c.email, c.direccion, c.telefono]);
          this.spreadsheet.updateRange(
            {
              dataSource: [
                ['Cedula/RUC', 'Nombres', 'Correo', 'Direccion', 'Telefono'],
                ...toadd!
              ]
            },
            
          );
      }, 1000);
      
      let allVentas:Venta[] = await this.ventaService.getAllVentas();
      console.log('ventas', allVentas);

      
      /*this.spreadsheet.insertSheet([{ index: 0, name: 'Ventas' }]);
      
      this.spreadsheet.updateCell({ value: 'Factura No.' }, 'B4');
      this.spreadsheet.updateCell({ value: 'Cliente' }, 'C4');
      this.spreadsheet.updateCell({ value: 'Nombres' }, 'D4');
      this.spreadsheet.updateCell({ value: 'Direccion' }, 'E4');
      this.spreadsheet.updateCell({ value: 'Telefono' }, 'F4');
      this.spreadsheet.updateCell({ value: 'Telefono' }, 'F4');*/
      
      /*allClientes?.forEach((item:ClienteProv, i) => {
        const row = i + 5;
        this.spreadsheet.updateCell({ value: item.identificador_fiscal }, `B${row}`);
        this.spreadsheet.updateCell({ value: item.nombres }, `C${row}`);
        this.spreadsheet.updateCell({ value: item.email }, `D${row}`);
        this.spreadsheet.updateCell({ value: item.direccion }, `E${row}`);
        this.spreadsheet.updateCell({ value: item.telefono }, `F${row}`);        
      });
      
      this.spreadsheet.autoFit('A1:F1');
      this.spreadsheet.autoFit('A4:F4');
      this.spreadsheet.autoFit('B4:B'+(allClientes?.length!+4));
      this.spreadsheet.autoFit('C4:C'+(allClientes?.length!+4));
      this.spreadsheet.autoFit('D4:D'+(allClientes?.length!+4));
      this.spreadsheet.autoFit('E4:E'+(allClientes?.length!+4));
      this.spreadsheet.autoFit('F4:F'+(allClientes?.length!+4));*/
      
      let allDetalles = await this.ventaDetalleServicio.getAllDetalleVentas();
      console.log('detalles', allDetalles);

      let allProductos = await this.productoServicio.getAllProductos();
      console.log('productos', allProductos);
      
      //unir ventas con clientes
      allVentas = allVentas.map(v => {
        const cliente = allClientes?.find(c => c.id === v.id_cliente) || null;
        return { ...v, cliente };
      });

      setTimeout(() => {        
        this.spreadsheet.insertSheet([{ index: 0, name: 'Ventas' }]);
          var toadd1 = allVentas.map( (v:any) => [v.nro_comprobante, v.fecha, v.cliente?.identificador_fiscal, v.cliente?.nombres, v.cliente?.direccion, v.cliente?.telefono, v.sub_total, v.total_impuestos, v.monto_total]);
          this.spreadsheet.updateRange(
            {
              dataSource: [
                ['NoComprbante','Fecha', 'Cedula/Ruc', 'Nombres', 'Direccion', 'Telefono',  'Subtotal', 'IVA', 'Total'],
                ...toadd1!
              ]
            },            
          );
      }, 1000);
      
      
      //unir detalleventas con venta cliente y productos
      allDetalles = allDetalles.map(dv => {
        const venta = allVentas.find(v => v.id === dv.id_venta) || null;
        const producto = allProductos.find(p => p.id === dv.id_producto) || null;
        return { ...dv, venta, producto };
      });

      
      setTimeout(() => {        
        this.spreadsheet.insertSheet([{ index: 0, name: 'DetalleVentas' }]);
          var toadd2 = allDetalles.map( (dv:any) => [dv.venta?.nro_comprobante, dv.producto?.id, dv.producto?.nombre, dv.cantidad, dv.precio_venta, dv.total]);
          this.spreadsheet.updateRange(
            {
              dataSource: [
                ['NoComprbante','Codigo', 'Producto', 'Cantidad', 'PrecioUnitario', 'Total'],
                ...toadd2!
              ]
            },            
          );
      }, 1000);

      
    }

    


    private supabaseService:SupabaseService = inject(SupabaseService);

    


    beforeOpen (args: BeforeOpenEventArgs) {
        // your code snippets here
    }

    beforeSave(args: any) {
        args.cancel = true; // Evita que Syncfusion use el saveUrl

        const blob = new Blob([args.jsonObject], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const file = new File([blob], "mi-hoja.xlsx", { type: blob.type });

        this.supabaseService.client.storage
          .from("mybucket")
          .upload(`spreadsheets/${file.name}`, file, { upsert: true })
          .then(({ data, error }) => {
            if (error) console.error("Error subiendo a Supabase:", error);
            else console.log("Subido:", data);
          });
      }


}
