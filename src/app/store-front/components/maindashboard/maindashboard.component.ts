import { Component, ViewEncapsulation, Inject, ViewChild, inject } from '@angular/core';
import { DashboardLayoutComponent, PanelModel, ResizeEventArgs, DashboardLayoutAllModule } from '@syncfusion/ej2-angular-layouts';
import { AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationChartAllModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { SidebarComponent, SidebarAllModule } from '@syncfusion/ej2-angular-navigations';
import { ILoadedEventArgs, ChartComponent, ChartTheme, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { MapsTheme, Maps, Legend, Marker, MapsTooltip, ILoadEventArgs, MapsAllModule } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps';
import { NgClass } from '@angular/common';

import { ChangeDetectorRef } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { EmpresasService } from '@store-front/services/empresas.service';


import { SupabaseService } from '../../../supabase/supabase.service';
import { ClienteProvService } from 'src/app/clientesprov/services/clienteprov.service';
import { SharedService } from '@store-front/services/shared.service';
import { VentasService } from '@store-front/services/ventas.service';
import { Empresa } from '../interfaces/empresa.interface';
import { AuthService } from '@auth/services/auth.service';
import { DetalleVentaService } from '@store-front/services/detalleventa.service';
import { ProductsService } from '@products/services/products.service';
import { ClienteProv } from 'src/app/clientesprov/interfaces/clienteprov.interface';
import { Venta } from '../interfaces/factura.interfaces';
import { OpenAIService } from '@store-front/services/openai.service';
import Swal from 'sweetalert2';


Maps.Inject(Legend, Marker, MapsTooltip);

/**

 * Default  component
 */
@Component({
    selector: 'main-dashboard-root',
    styleUrls: ['maindashboard.component.css'],
    templateUrl: 'maindashboard.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SidebarAllModule, DashboardLayoutAllModule, AccumulationChartAllModule, MapsAllModule, ChartAllModule, ListBoxModule]
})
export class MainDashboardComponent {

    @ViewChild('editLayout')
    public dashboard!: DashboardLayoutComponent;
    @ViewChild('pie')
    public pie!: AccumulationChart;
    @ViewChild('piechart') public piechart!: ChartComponent;
    @ViewChild('lineChart') public lineChart!: ChartComponent;
    @ViewChild('colchart') public colchart!: ChartComponent;

    public miEmpresa:Empresa|null  = localStorage.getItem('MiEmpresa') ? (JSON.parse(localStorage.getItem('MiEmpresa') || "")):null;
    public actualEmpresa:Empresa|null  = localStorage.getItem('ActualEmpresa') ? (JSON.parse(localStorage.getItem('ActualEmpresa') || "")):null;

    //Empresas
    //public empresaService!:EmpresasService;
    empresaService = inject(EmpresasService);

    public dataEmpresas!: { [key: string]: Object }[];
    
    public cellSpacing: number[] =  [5, 5];
    public aspectRatio : any = 100 / 85;
    public centerTitle: any;
    
    constructor(private cdr: ChangeDetectorRef,
        private clienteServicio:ClienteProvService, private shared: SharedService, private ventaService:VentasService, private openAI: OpenAIService,
        private empresaServicio:EmpresasService, private ventaDetalleServicio:DetalleVentaService, private productoServicio:ProductsService,     
    ) {this.centerTitle = (document.createElement('div') as HTMLElement);}

    // Sidebar data
    public enableDock: boolean = true;
    public type: string = 'Over';
    public dockSize: string = '60px';
    public closeOnDocumentClick: boolean = true;
    // public target: string = '.sidebar-content';
    public target: string = '#target';
    public enablesmartlabel: boolean = true;
    public startAngle: number = 0;
    public endAngle: number = 360;
    public dataLabel: Object = {
        visible: true, position: 'Inside',
        name: 'text',
        font: { color: 'white', fontWeight: '600', size: '14px' }
    };
    public palettes: any = ['#357cd2', '#00bdae', '#e36593'];
    public legendSettings: Object = {
        visible: false, toggleVisibility: false,
        position: 'Right', height: '28%', width: '44%'
    };
    public tooltip: Object = {
        enable: true,
        header: '<b>${point.x}</b>',
        format: 'Composition : <b>${point.y}%</b>'
    };


    public expenseData: any = [
        {
            'UniqueId': 'T100003',
            'DateTime': new Date(1488359820000),
            'Category': 'Food',
            'PaymentMode': 'Cash',
            'TransactionType': 'Expense',
            'Description': 'Confederate cush',
            'Amount': '900',
            'MonthShort': 'Mar',
            'MonthFull': 'March, 2017',
            'FormattedDate': '03/01/2017 08:53 PM',
            'Device': 'Tablet'
        }, {
            'UniqueId': 'T100004',
            'DateTime': new Date(1491038220000),
            'Category': 'Transportation',
            'PaymentMode': 'Credit Card',
            'TransactionType': 'Expense',
            'Description': 'Public and other transportation',
            'Amount': '1200',
            'MonthShort': 'Apr',
            'MonthFull': 'April, 2017',
            'FormattedDate': '04/01/2017 10:44 AM',
            'Device': 'Desktop'
        }, {
            'UniqueId': 'T100005',
            'DateTime': new Date(1493630220000),
            'Category': 'Transportation',
            'PaymentMode': 'Cash',
            'TransactionType': 'Expense',
            'Description': 'Public and other transportation',
            'Amount': '600',
            'MonthShort': 'May',
            'MonthFull': 'May, 2017',
            'FormattedDate': '05/01/2017 03:25 PM',
            'Device': 'Mobile'
        },
    ];

    // Map data
    public zoomSettings: Object = { enable: true };
    public maplegendSettings: Object = { visible: true };
    

    // ColumnChart properties
    public primaryXAxis: object = {
        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
    };
    public chartArea: object = { border: { width: 0 } };
    public margin: object = { top: 30 };
        //Initializing Primary X Axis
    public primaryYAxis: object = {
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
    };
    public collegendSettings: object = { visible: false};
    public marker: object = { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } };
    public data: any = [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }];
    public data1: any = [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }];
    public data2: any = [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }];

    // Line Chart
    lineprimaryXAxis: object = {
        valueType: 'DateTime',
        labelFormat: 'MMM',
        majorGridLines: { width: 0 },
        intervalType: 'Months',
        edgeLabelPlacement: 'Shift'
    };
    lineprimaryYAxis: object = {
        maximum: 4, interval: 1,
        labelFormat: '{value}',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public linelegendSettings: Object = { visible: false };
    public widthValue: any = '100%';
    public heightValue: any = '100%';
    
    
    


    public columnData: any = [
        { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
        { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
        { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
        { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
        { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
    ];
    
    
    public columnData1: any = [
        { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
        { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
        { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
        { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
        { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
    ];





    public lineborder: object = { color: 'transparent' };

    // PieChart data
    public center: object =  { x: '50%', y: '50%' };


    public piedataSource: any = [
        { 'x': 'Desktop', y: 37, text: '60%' }, { 'x': 'Mobile', y: 17, text: '10%' },
        { 'x': 'Tablet', y: 19, text: '20%' }
    ];
    piedataLabel: object = {
        visible: true, position: 'Inside', name: 'text', font: { fontWeight: '600' }
    };
    public piechartLoad(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    public explode: boolean = true;
    load(args: any): void  {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <any>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
    animationComplete(args: any): void {
        this.centerTitle.style.fontSize = this.getFontSize(this.pie.initialClipRect.width);
        let rect: ClientRect = this.centerTitle.getBoundingClientRect();
        this.centerTitle.style.top = (this.pie.origin.y - rect.height / 2) + 'px';
        this.centerTitle.style.left = (this.pie.origin.x - rect.width / 2) + 'px';
        this.centerTitle.style.visibility = 'visible';
        let points: any[] = this.pie.visibleSeries[0].points;
        for (let i: number = 0; i < points.length; i++) {
            let point: any = points[i];
            if (point.labelPosition === 'Outside' && point.labelVisible) {
                let label: HTMLElement = document.getElementById('pie_datalabel_Series_0_text_' + point.index)!;
                label.setAttribute('fill', 'black');
            }
        }
    }
    textRender(args: any): void {
        args.series.dataLabel.font.size = this.getFontSize(this.pie.initialClipRect.width);
            this.pie.animateSeries = true;
    }
    getFontSize(width: any): string {
        if (width > 300) {
            return '13px';
        } else if (width > 250) {
            return '13px';
        } else {
            return '13px';
        }
    }
    ngAfterViewInit() {
    this.centerTitle.innerHTML = 'Active <br> users  &nbsp';
    this.centerTitle.style.position = 'absolute';
    this.centerTitle.style.visibility = 'hidden';
    }

    async ngOnInit(){
            this.cdr.detectChanges();
            this.empresaService.getAllEmpresasUsers(5).then(empresas => {
              console.log(empresas)
              if (empresas && empresas?.length>0){
                localStorage.setItem('MiEmpresa',JSON.stringify(empresas[0]));

                //localStorage.setItem('ActualEmpresa',JSON.stringify(empresas[0]));
                this.dataEmpresas = empresas.map(elemento => {
                  return { text: 'Su Empresa :' + elemento.nombre, pic: 'javascript', description: elemento.iso + ' - email:' + elemento.correo + ' direccion ' +elemento.direccion_fiscal }
                })
              }});


      let allClientes = await this.clienteServicio.getAllClientes();
      console.log('clientes', allClientes);
      let allVentas:Venta[] = await this.ventaService.getAllVentas();
      console.log('ventas', allVentas);
      let allDetalles = await this.ventaDetalleServicio.getAllDetalleVentas();
      console.log('detalles', allDetalles);
      let allProductos = await this.productoServicio.getAllProductos();
      console.log('productos', allProductos);
      //unir ventas con clientes
      allVentas = allVentas.map(v => {
        const cliente = allClientes?.find(c => c.id === v.id_cliente) || null;
        return { ...v, cliente };
      });

      /*this.columnData = [
        allVentas.map( (dato:any) =>         
        ({ x: dato.fecha, y: dato.cantidad_productos })
      )];
      this.columnData1 = 
        allVentas.map( (dato:any) => {
          return { x: dato.fecha, y: dato.cantidad_productos }}
      );*/

      //console.log('data de grafico', [allVentas.map( (dato:any) => {return { x: dato.fecha, y: dato.cantidad_productos }})])
      let acc:any=[];
      for(let i=0; i < allDetalles.length ; i++){
        let venta = allDetalles[i];
        let existe = acc.find((item:any) => item.x == venta.descripcion);
        if (existe) {
          // Si ya existe, sumamos la cantidad y el total
          existe.y += venta.cantidad;
          existe.text = (venta.cantidad/allDetalles.length*100)+'%';
        } else {
          // Si no existe, agregamos una copia del objeto
          acc.push({ 'x': venta.descripcion, y: venta.cantidad, text: (venta.cantidad/allDetalles.length*100)+'%' });
        }        
      };
      console.log(acc, 'resumen');
      this.piedataSource = acc;

      

      //unir detalleventas con venta cliente y productos
      /*allDetalles = allDetalles.map(dv => {
        const venta = allVentas.find(v => v.id === dv.id_venta) || null;
        const producto = allProductos.find(p => p.id === dv.id_producto) || null;
        return { ...dv, venta, producto };
      });*/
      


    }
}
