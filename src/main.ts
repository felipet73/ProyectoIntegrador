import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
import { L10n, setCulture } from '@syncfusion/ej2-base';

import { environment } from 'src/environments/environment';

const SYNCFUSION_KEY = environment.SYNCFUSION_KEY;


L10n.load({
  'es-ES': {
    grid: {
      EmptyRecord: 'No hay registros para mostrar',
      True: 'Verdadero',
      False: 'Falso',
      GroupDropArea: 'Arrastre una columna aquí para agrupar su columna',
      UnGroup: 'Haga clic aquí para desagrupar',
      //add record, edit record, delete record
      Add: 'Agregar',
      Edit: 'Editar',
      Delete: 'Eliminar',
      Update: 'Actualizar',
      Cancel: 'Cancelar',
      // toolbar and menu
      Search: 'Buscar',
      //filterbar
      MatchCase: 'Coincidir mayúsculas y minúsculas',
      ClearButton: 'Limpiar',
      //filter menu
      Contains: 'Contiene',
      Equal: 'Igual a',
      StartsWith: 'Comienza con',
      EndsWith: 'Termina con',
      GreaterThan: 'Mayor que',
      LessThan: 'Menor que',
      GreaterThanOrEqual: 'Mayor o igual que',
      LessThanOrEqual: 'Menor o igual que',
      NotEqual: 'No es igual a',
      //filter operators
      AND: 'Y',
      OR: 'O',
      //cloning
      CloneRow: 'Clonar fila',
      //paging
      PageFirst: 'Primera página',
      PageLast: 'Última página',
      PageNext: 'Página siguiente',
      PagePrevious: 'Página anterior',
      //pager info
      PagerInfo: '{0} de {1} páginas ({2} elementos)',
      //selection
      SelectAll: 'Seleccionar todo',
      //sort
      SortAscending: 'Ordenar ascendente',
      SortDescending: 'Ordenar descendente',
      //columnchooser
      ColumnChooser: 'Selector de columnas',
      //grouping
      GroupingBar: 'Barra de agrupación',
      UngroupingBar: 'Barra de desagrupación',
      //filterbar
      FilterbarTitle: 'Barra de filtro',
      //summary
      Sum: 'Suma',
      Average: 'Promedio',
      Count: 'Contar',
      Min: 'Mínimo',
      Max: 'Máximo',
      //reorder
      Reorder: 'Reordenar',
      //resize
      Resize: 'Redimensionar',
      //exporting
      ExcelExport: 'Exportar a Excel',
      CsvExport: 'Exportar a CSV',
      PdfExport: 'Exportar a PDF',
      //selection
      Selection: 'Selección',
      //column menu
      ColumnMenu: 'Menú de columna',
      //column header
      ColumnHeader: 'Encabezado de columna',
      //filter dialog
      FilterDialogTitle: 'Filtrar',
      FilterDialogOkBtn: 'Filtrar',
      FilterDialogCancelBtn: 'Cancelar',
      //filterbar operators
      FilterbarOperator: 'Operador de barra de filtro',
      //enter value text
      EnterValueText: 'Ingrese un valor',
      //boolean operators
      BooleanOperator: 'Operador booleano',
      //string operators
      StringOperator: 'Operador de cadena',
      //number operators
      NumberOperator: 'Operador numérico',
      //date operators
      DateOperator: 'Operador de fecha',
      //filter menu operators
      FilterMenuOperator: 'Operador de menú de filtro',
      //column visibility
      ColumnVisibility: 'Visibilidad de columna',
      //column drag
      ColumnDrag: 'Arrastrar columna',
      //foreign key
      ForeignKeyAlert: 'La edición de clave externa está deshabilitada en el modo de celda',
      //batch save
      BatchSaveConfirm: '¿Está seguro de que desea guardar los cambios?',
      BatchSaveLostChanges: 'Los cambios no guardados se perderán. ¿Está seguro de que desea continuar?',
      //virtualization
      VirtualizationAlert: 'La edición está deshabilitada en el modo de virtualización',
      //checkbox column
      CheckboxColumn: 'Columna de casilla de verificación',
      //grouping bar aggregation
      GroupingBarAggregation: 'Agregación',
      //advanced filter
      AdvancedFilter: 'Filtro avanzado',
      FilterBy: 'Filtrar por',
      FilterValue: 'Valor de filtro',
      FilterCondition: 'Condición de filtro',
      ShowRowsWhere: 'Mostrar filas donde',
      ClearAll: 'Borrar todo',
      FilterSummary: 'Se encontraron {0} registros',
      CustomFilter: 'Filtro personalizado',
      CustomFilterPlaceHolder: 'Ingrese el valor',
      //header filters
      Equals: 'Igual',
      NotEquals: 'No es igual',
      BeginsWith: 'Comienza con',
      DoesNotContain: 'No contiene',
      GreaterThanOrEqualTo: 'Mayor o igual que',
      LessThanOrEqualTo: 'Menor o igual que',
      //date filter
      Today: 'Hoy',
      Yesterday: 'Ayer',
      ThisWeek: 'Esta semana',
      LastWeek: 'La semana pasada',
      ThisMonth: 'Este mes',
      LastMonth: 'El mes pasado',
      ThisYear: 'Este año',
      LastYear: 'El año pasado',
      //number filter
      Between: 'Entre',
      In: 'En',
      NotIn: 'No en',
      //boolean filter
      //function text
      Blanks: 'En blanco',
      NoResult: 'No se encontraron resultados',
      //template column
      EditTemplate: 'Editar plantilla',
      FilterTemplate: 'Filtrar plantilla',
      //group caption
      GroupCaption: 'Elementos',
      //auto fit
      AutoFitAllColumns: 'Ajuste automático de todas las columnas',
      AutoFitThisColumn: 'Ajuste automático de esta columna',
      //doesnot contain
      DoesNotBeginWith: 'No comienza con',
      DoesNotEndWith: 'No termina con',
      DoesNotEqual: 'No es igual a',
      //clear filter
      ClearFilter: 'Borrar filtro',
      //starts with
      StartsWithApostrophe: "Comienza con '''",
      //ends with
      EndsWithApostrophe: "Termina con '''",
      //contains
      ContainsApostrophe: "Contiene '''",
      //doesnot contain
      DoesNotContainApostrophe: "No contiene '''",
      //date operators
      After: 'Después',
      Before: 'Antes',
      //conditional formatting
      ConditionalFormatting: 'Formato condicional',
      //save button
      SaveButton: 'Guardar',
      //reset button
      ResetButton: 'Restablecer',
      //apply button
      ApplyButton: 'Aplicar',
      //format dialog
      FormatDialogTitle: 'Formato',
      //sort ascending
      SortAsc: 'Ordenar ascendente',
      //sort descending
      SortDesc: 'Ordenar descendente',
      //clear sorting
      ClearSorting: 'Borrar ordenamiento',
      //sort a to z
      SortAtoZ: 'Ordenar de la A a la Z',
      //sort z to a
      SortZtoA: 'Ordenar de la Z a la A',
      //sort small to large
      SortSmallToLarge: 'Ordenar de menor a mayor',
      //sort large to small
      SortLargeToSmall: 'Ordenar de mayor a menor',
      //clear filter
      ClearFilterFrom: 'Borrar filtro de',
      //filter by condition
      FilterByCondition: 'Filtrar por condición',
      //filter by value
      FilterByValue: 'Filtrar por valor',
      //filter by color
      FilterByColor: 'Filtrar por color',
      //custom sort
      CustomSort: 'Ordenamiento personalizado',
      //custom filter
      CustomFilterMenu: 'Menú de filtro personalizado',
      //edit operation
      EditOperationAlert: 'No se puede editar en el modo de vista previa',
      //delete operation
      DeleteOperationAlert: 'No se puede eliminar en el modo de vista previa',
      //save operation
      SaveOperationAlert: 'No se puede guardar en el modo de vista previa',
      //cancel operation
      CancelOperationAlert: 'No se puede cancelar en el modo de vista previa',
      //search in filter
      SearchInFilter: 'Buscar en filtro',
      //add new record
      AddNewRecord: 'Agregar nuevo registro',
      //copy
      Copy: 'Copiar',
      //grouping
      GroupBy: 'Agrupar por',
      //ungrouping
      UngroupBy: 'Desagrupar por',
      //exporting
      Exporting: 'Exportando',
      //export to excel
      ExportToExcel: 'Exportar a Excel',
      //export to csv
      ExportToCsv: 'Exportar a CSV',
      //export to pdf
      ExportToPdf: 'Exportar a PDF',
      //text filter
      TextFilters: 'Filtros de texto',
      //number filter
      NumberFilters: 'Filtros numéricos',
      //date filter
      DateFilters: 'Filtros de fecha',
      //boolean filter
      BooleanFilters: 'Filtros booleanos',
      //dynamic filter
      DynamicFilters: 'Filtros dinámicos',
      //Does not contain
      DoesNotContains: 'No contiene',
      DoesNotStartWith: 'No comienza con',
      doesnotendwith: 'No termina con',
      doesnotequal: 'No es igual a',
      doesNotContain: 'No contiene',
      //... other grid localization strings
    },
    spreadsheet:{
      file: 'Archivo',
      new: 'Nuevo',
      open: 'Abrir',
      save: 'Guardar',
      export: 'Exportar',
      import: 'Importar',
      print: 'Imprimir',
      exit: 'Salir',
      edit: 'Editar',
      undo: 'Deshacer',
      redo: 'Rehacer',
      copy: 'Copiar',
      cut: 'Cortar',
      paste: 'Pegar',
      findReplace: 'Buscar y reemplazar',
      find: 'Buscar',
      replace: 'Reemplazar',
      goto: 'Ir a',
      selectAll: 'Seleccionar todo',
      view: 'Ver',
      showHide: 'Mostrar/Ocultar',
      toolbar: 'Barra de herramientas',
      formulaBar: 'Barra de fórmulas',
      sheetTabBar: 'Barra de pestañas de hoja',
      help: 'Ayuda',
      fullScreen: 'Pantalla completa',
      sortAndFilter: 'Ordenar y filtrar',
      sortAsc: 'Ordenar ascendente',
      sortDesc: 'Ordenar descendente',
      clearSort: 'Borrar ordenamiento',
      filter: 'Filtro',
      numberFormat: 'Formato de número',
      currencyFormat: 'Formato de moneda',
      percentageFormat: 'Formato de porcentaje',
      increaseDecimal: 'Aumentar decimal',
      decreaseDecimal: 'Disminuir decimal',
      accountingFormat: 'Formato contable',
      shortDateFormat: 'Formato de fecha corta',
      longDateFormat: 'Formato de fecha larga',
      timeFormat: 'Formato de hora',
      dateTimeFormat: 'Formato de fecha y hora',
      moreFormats: 'Más formatos',
      cellStyles: 'Estilos de celda',
      cellStyleHeaderText: 'Estilos de celda',
      conditionalFormatting: 'Formato condicional',
      formatCells: 'Formato de celdas',
      fontFamily: 'Familia de fuente',
      fontSize: 'Tamaño de fuente',
      bold: 'Negrita',
      italic: 'Cursiva',
      underline: 'Subrayado',
      strikethrough: 'Tachado',
      fontColor: 'Color de fuente',
      fillColor: 'Color de relleno',
      horizontalAlign: 'Alineación horizontal',
      leftAlign: 'Alinear a la izquierda',
      centerAlign: 'Alinear al centro',
      rightAlign: 'Alinear a la derecha',
      verticalAlign: 'Alineación vertical',
      topAlign: 'Alinear arriba',
      middleAlign: 'Alinear al medio',
      bottomAlign: 'Alinear abajo',
      wrapText: 'Ajustar texto',
      mergeCells: 'Combinar celdas',
      mergeAll: 'Combinar todo',
      mergeHorizontally: 'Combinar horizontalmente',
      mergeVertically: 'Combinar verticalmente',
      unmerge: 'Descombinar',
      insertComment: 'Insertar comentario',
      editComment: 'Editar comentario',
      deleteComment: 'Eliminar comentario',
      hideComment: 'Ocultar comentario',
      showComment: 'Mostrar comentario',
      showHideComments: 'Mostrar/Ocultar comentarios',
      insertLink: 'Insertar enlace',
      editLink: 'Editar enlace',
      deleteLink: 'Eliminar enlace',
      openLink: 'Abrir enlace',
      cell: 'Celda',
      row: 'Fila',
      column: 'Columna',
      deleteRow: 'Eliminar fila',
      deleteColumn: 'Eliminar columna',
      insertRowAbove: 'Insertar fila arriba',
      insertRowBelow: 'Insertar fila abajo',
      insertColumnLeft: 'Insertar columna a la izquierda',
      insertColumnRight: 'Insertar columna a la derecha',
      hideRow: 'Ocultar fila',
      hideColumn: 'Ocultar columna',
      unhideRow: 'Mostrar fila',
      unhideColumn: 'Mostrar columna',
      renameSheet: 'Renombrar hoja',
      moveOrCopySheet: 'Mover o copiar hoja',
      copySheet: 'Copiar hoja',
      deleteSheet: 'Eliminar hoja',
      addSheet: 'Agregar hoja',
      sheet1: 'Hoja1',
      sheet2: 'Hoja2',
      sheet3: 'Hoja3',
      sheet4: ' Hoja4',
      sheet5: 'Hoja5',
      sheet6: 'Hoja6',
      sheet7: 'Hoja7',
      sheet8: 'Hoja8',
      sheet9: 'Hoja9',
      sheet10: 'Hoja10',
      hideSheet: 'Ocultar hoja',
      unhideSheet: 'Mostrar hoja',
      protectSheet: 'Proteger hoja',
      unprotectSheet: 'Desproteger hoja',
      protectWorkbook: 'Proteger libro',
      unprotectWorkbook: 'Desproteger libro',
      freezePane: 'Inmovilizar paneles',
      unfreezePane: 'Desinmovilizar paneles',
      freezeTopRow: 'Inmovilizar fila superior',
      freezeFirstColumn: 'Inmovilizar primera columna',
      unfreezeTopRow: 'Desinmovilizar fila superior',
      unfreezeFirstColumn: 'Desinmovilizar primera columna',
      split: 'Dividir',
      gridlines: 'Líneas de cuadrícula',
      headings: 'Encabezados',
      formulaBarHide: 'Ocultar barra de fórmulas',
      formulaBarShow: 'Mostrar barra de fórmulas',
      sheetTabBarHide: 'Ocultar barra de pestañas de hoja',
      sheetTabBarShow: 'Mostrar barra de pestañas de hoja',
      increaseFontSize: 'Aumentar tamaño de fuente',
      decreaseFontSize: 'Disminuir  tamaño de fuente',
      normalText: 'Texto normal',
      heading1: 'Encabezado 1',
      heading2: 'Encabezado 2',
      heading3: 'Encabezado 3',
      heading4: 'Encabezado 4',
      heading5: 'Encabezado 5',
      heading6: 'Encabezado 6',
      title: 'Título',
      subtitle: 'Subtítulo',
      accent1: 'Énfasis 1',
      accent2: 'Énfasis 2',
      accent3: 'Énfasis 3',
      accent4: 'Énfasis 4',
      accent5: 'Énfasis 5',
      accent6: 'Énfasis 6',
      hyperlink: 'Hipervínculo',
      followedHyperlink: 'Hipervínculo visitado',
      none: 'Ninguno',
      solidFill: 'Relleno sólido',
      gradientFill: 'Relleno degradado',
      patternFill: 'Relleno con patrón',
      automatic: 'Automático',
      moreColors: 'Más colores',
      standardColors: 'Colores estándar',
      customColors: 'Colores personalizados',
      lightUp: 'Claro - Arriba',
      lightDown: 'Claro - Abajo',
      lightHorizontal: 'Claro - Horizontal',
      lightVertical: 'Claro - Vertical',
      lightUpDown: 'Claro - Arriba y Abajo',
      lightDiagonalUp: 'Claro - Diagonal arriba',
      lightDiagonalDown: 'Claro - Diagonal abajo',
      mediumUp: 'Medio - Arriba',
      mediumDown: 'Medio - Abajo',
      mediumHorizontal: 'Medio - Horizontal',
      mediumVertical: 'Medio - Vertical',
      mediumUpDown: 'Medio - Arriba y Abajo',
      mediumDiagonalUp: 'Medio - Diagonal arriba',
      mediumDiagonalDown: 'Medio - Diagonal abajo',
      darkUp: 'Oscuro - Arriba',
      darkDown: 'Oscuro - Abajo',
      darkHorizontal: 'Oscuro - Horizontal',
      darkVertical: 'Oscuro - Vertical',
      darkUpDown: 'Oscuro - Arriba y Abajo',
      darkDiagonalUp: 'Oscuro - Diagonal arriba',
      darkDiagonalDown: 'Oscuro - Diagonal abajo',
      noFill: 'Sin relleno',
      solid: 'Sólido',
      gradient: 'Degradado',
      pattern: 'Patrón',
      lightGray: 'Gris claro',
      yellow: 'Amarillo',
      lightYellow: 'Amarillo claro',
      orange: 'Naranja',
      lightOrange: 'Naranja claro',
      red: 'Rojo',
      lightRed: 'Rojo claro',
      pink: 'Rosa',
      lightPink: 'Rosa claro',
      purple: 'Púrpura',
      lightPurple: 'Púrpura claro',
      blue: 'Azul',
      lightBlue: 'Azul claro',
      lightTurquoise: 'Turquesa claro',
      teal: 'Verde azulado',
      lightGreen: 'Verde claro',
      green: 'Verde',
      darkGray: 'Gris oscuro',
      gray: 'Gris'
      //... other spreadsheet localization strings
    },
    pager: {
      currentPageInfo: '{0} de {1} páginas',
      totalItemsInfo: '({0} elementos)',
      firstPageTooltip: 'Ir a la primera página',
      lastPageTooltip: 'Ir a la última página',
      nextPageTooltip: 'Ir a la página siguiente',
      previousPageTooltip: 'Ir a la página anterior',
      nextPagerTooltip: 'Ir al siguiente conjunto de páginas',
      previousPagerTooltip: 'Ir al conjunto de páginas anterior',
      pageSizeItemInfo: 'Elementos por página'
      // ... other pager localization strings
    },
    button: {
      'Add': 'Agregar',
      'Edit': 'Editar',
      'Delete': 'Eliminar',
      'Update': 'Actualizar',
      'Cancel': 'Cancelar',
      'Search': 'Buscar'
      // ... other button localization strings
    },
    dropdowns: {
      noRecordsTemplate: 'No se encontraron registros',
      actionFailureTemplate: 'No se pudieron cargar los datos'
      // ... other dropdown localization strings
    },
    datetimepicker: {
      placeholder: 'Seleccionar fecha y hora',
      today: 'Hoy'
      // ... other datetimepicker localization strings
    },
    datepicker: {
      placeholder: 'Seleccionar fecha',
      today: 'Hoy'
      // ... other datepicker localization strings
    },
    numerictextbox: {
      placeholder: 'Ingresar valor numérico'
      // ... other numerictextbox localization strings
    },
    combobox: {
      noRecordsTemplate: 'No se encontraron registros',
      actionFailureTemplate: 'No se pudieron cargar los datos'
      // ... other combobox localization strings
    },
    listbox: {
      noRecordsTemplate: 'No se encontraron registros',
      actionFailureTemplate: 'No se pudieron cargar los datos'
      // ... other listbox localization strings
    },
    sidebar: {
      close: 'Cerrar',
      open: 'Abrir'
      // ... other sidebar localization strings
    },
    dialog: {
      close: 'Cerrar'
      // ... other dialog localization strings
    },
    tooltip: {
      close: 'Cerrar'
      // ... other tooltip localization strings
    },
    //input
    input: {
      placeholder: 'Ingresar valor',
      floatLabelType: 'Auto',
      clearButton: 'Limpiar',
      //search
      search: 'Buscar',
      // find text
      find: 'Buscar',
      // clear text
      clear: 'Limpiar',
      //Find next text
      findNext: 'Buscar siguiente',
      //Find previous text
      findPrevious: 'Buscar anterior',
      //Replace text
      replace: 'Reemplazar',
      //Replace all text
      replaceAll: 'Reemplazar todo',
      matchCase: 'Coincidir mayúsculas y minúsculas',
      //Replace Text
      replaceWith: 'Reemplazar con',
      //Find Text
      findWhat: 'Buscar qué',

      // ... other input localization strings


    },
    // bars and menus
    'Cut': 'Cortar',
    'Copy': 'Copiar',
    'Paste': 'Pegar',
    'Bold': 'Negrita',
    'Italic': 'Cursiva',
    'Underline': 'Subrayado',
    'Alignments': 'Alineaciones',
    'Align Left': 'Alinear a la izquierda',
    'Align Center': 'Alinear al centro',
    'Align Right': 'Alinear a la derecha',
    'Justify': 'Justificar',
    'Ordered List': 'Lista ordenada',
    'Unordered List': 'Lista desordenada',
    'Indent': 'Aumentar sangría',
    'Outdent': 'Disminuir sangría',
    'Undo': 'Deshacer',
    'Redo': 'Rehacer',
    'Insert Link': 'Insertar enlace',
    'Open Link': 'Abrir enlace',
    'Edit Link': 'Editar enlace',
    'Unlink': 'Quitar enlace',
    'Insert Image': 'Insertar imagen',
    'Insert Table': 'Insertar tabla',
    'Add Row Above': 'Agregar fila arriba',
    'Add Row Below': 'Agregar fila abajo',
    'Add Column Left': 'Agregar columna a la izquierda',
    'Add Column Right': 'Agregar columna a la derecha',
    'Delete Row': 'Eliminar fila',
    'Delete Column': 'Eliminar columna',
    'Delete Table': 'Eliminar tabla',
    'Caption': 'Título',
    'Cell Properties': 'Propiedades de celda',
    'Table Properties': 'Propiedades de tabla',
    'Merge Cells': 'Combinar celdas',
    'Split Cell': 'Dividir celda',
    'Horizontal Split': 'División horizontal',
    'Vertical Split': 'División vertical',
    //add record, edit record, delete record
    'Add': 'Agregar',
    'Edit': 'Editar',
    'Delete': 'Eliminar',
    'Update': 'Actualizar',
    'Cancel': 'Cancelar',
    // toolbar and menu
    'File': 'Archivo',
    'New': 'Nuevo',
    'New Window': 'Nueva ventana',
    'Open...': 'Abrir...',
    'Save': 'Guardar',
    'Save As...': 'Guardar como...',
    'Print...': 'Imprimir...',
    'Print Preview...': 'Vista previa de impresión...',
    // 'Edit': 'Editar', // Removed duplicate key
    'Find...': 'Buscar...',
    'Find and Replace...': 'Buscar y reemplazar...',
    'Replace...': 'Reemplazar...',
    'Go To...': 'Ir a...',
    'Select All': 'Seleccionar todo',
    'Preferences...': 'Preferencias...',
    'View': 'Ver',
    'Actual Size': 'Tamaño real',
    'Zoom In': 'Acercar',
    'Zoom Out': 'Alejar',
    'Reset Zoom': 'Restablecer zoom',
    'Toolbars': 'Barras de herramientas',
    'Status Bar': 'Barra de estado',
    'Bookmarks': 'Marcadores',
    'Tools': 'Herramientas',
    'Spelling and Grammar...': 'Ortografía y gramática...',
    'Word Count...': 'Contar palabras...',
    'Speech...': 'Voz...',
    'Dictionary...': 'Diccionario...',
    'Translate...': 'Traducir...',
    'Help': 'Ayuda',
    'About [PRODUCT_NAME]': 'Acerca de [PRODUCT_NAME]',
    'Check for Updates...': 'Buscar actualizaciones...',
    'Search the Web...': 'Buscar en la web...',
    'Learn More...': 'Aprender más...',
    'Privacy Policy': 'Política de privacidad',
    'Terms of Service': 'Términos de servicio',
    'Contact Us...': 'Contáctenos...',
    'Help Center...': 'Centro de ayuda...',
    'Report an Issue...': 'Reportar un problema...',
    'Keyboard Shortcuts...': 'Atajos de teclado...',
    'Documentation...': 'Documentación...',
    // ... other toolbar and menu localization strings
    'Menu': 'Menú',
    // ... other bar and menu localization strings
    // grid headertexts
    'Grid': 'Cuadrícula',
    'Chart': 'Gráfico',
    'Datepicker': 'Selector de fecha',
    'Dialog': 'Diálogo',

    'Find': 'Buscar',
    'Find Next': 'Buscar siguiente',
    'Find Previous': 'Buscar anterior',
    'Replace': 'Reemplazar',
    'Replace All': 'Reemplazar todo'
    // ... other component localization strings
    ,
    'Upload': 'Subir',
    'Browse': 'Examinar',
    'Clear': 'Limpiar',
    'No file chosen': 'Ningún archivo seleccionado',
    'Drop files here to upload': 'Suelte los archivos aquí para subirlos',
    //search text
    'Search': 'Buscar',
    'No data found': 'No se encontraron datos',
    'Loading...': 'Cargando...',
  },
});
setCulture('es-ES');
// Registering Syncfusion license key
registerLicense(SYNCFUSION_KEY);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
