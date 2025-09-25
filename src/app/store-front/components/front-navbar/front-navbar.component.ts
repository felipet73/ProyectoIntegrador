import { Component, ViewEncapsulation, inject, ViewChild, signal } from '@angular/core';
import { SidebarComponent, ClickEventArgs, ToolbarModule, SidebarModule, MenuItemModel, MenuModule } from '@syncfusion/ej2-angular-navigations';

import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { AuthService } from '@auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { ProducTableComponent } from "@products/components/product-table/product-table.component";
import { EmpresaComponent } from '../empresa/empresa.component';

import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { InformationComponent } from "../information/information.component";
import { MainDashboardComponent } from "../maindashboard/maindashboard.component";
import { HojaExcelComponent } from "../hojaexcel/hojaexcel.component";
import { ClientesProvTableComponent } from 'src/app/clientesprov/components/clientesprov-table/clientesprov-table.component';
import { KardexTableComponent } from 'src/app/kardex/components/kardex-table/kardex-table.component';
import { TotalEmpresaComponent } from '../totalempresa/totalempresa.component';
import { FacturaVentaComponent } from '../facturaventa/facturaventa/facturaventa.component';
import { Asignacion_Sucursal, Empresa } from '../interfaces/empresa.interface';
import { EmpresasService } from '@store-front/services/empresas.service';
import { SharedService } from '@store-front/services/shared.service';





@Component({
    selector: 'front-navbar',
    styleUrls: ['front-navbar.component.css'],
    templateUrl: 'front-navbar.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ToolbarModule, SidebarModule, ListViewModule, ComboBoxModule, NumericTextBoxModule, RouterLink, TextBoxModule, MenuModule,
      ProducTableComponent, InformationComponent, MainDashboardComponent, HojaExcelComponent,
      ClientesProvTableComponent, KardexTableComponent, TotalEmpresaComponent, FacturaVentaComponent
    ],
})
export class FrontNavbarComponent {


   public miEmpresa:Empresa|null  = localStorage.getItem('MiEmpresa') ? (JSON.parse(localStorage.getItem('MiEmpresa') || "")):null;
  public actualEmpresa:Empresa|null  = localStorage.getItem('ActualEmpresa') ? (JSON.parse(localStorage.getItem('ActualEmpresa') || "")):null;

  public Empresa: string[] = [this.miEmpresa ? this.miEmpresa.nombre : 'MiEmpresa'];
  public Cargo: string[] = ['Admin'];

    authService = inject(AuthService);
    @ViewChild('dockBar')
    public dockBar!: SidebarComponent;
    public enableDock: boolean = true;
    public showIcon: boolean = true;

    public dockSize: string = '50px';
    public width: string = '220px';
    public target: string = '.main-menu-content';
    empresasCaja:Empresa[] = [];
    public selectedItem = signal('Clientes');

    @ViewChild('sidebarMenuInstance')
    public sidebarMenuInstance!: SidebarComponent;
    public menuItems: MenuItemModel[] = [
        {
            text: 'DashBoard',
            iconCss: 'icon-bell-alt icon',
            items: [
                { text: 'DashBoard' }
            ]
        },
        {
            text: 'Datos',
            iconCss: 'icon-bell-alt icon',
            items: [
                { text: 'Clientes/Proveedores' },
                { text: 'Productos' }
            ]
        },
        {
            text: 'Ventas',
            iconCss: 'icon-tag icon',
            items: [
                { text: 'Factura/Egreso' },
                { text: 'Reporte Ventas' }
            ]
        },
        // {
        //     text: 'Compras',
        //     iconCss: 'icon-comment-inv-alt2 icon',
        //     items: [
        //         { text: 'Compra/Ingreso' },
        //         { text: 'Reporte Compras' }
        //     ]
        // },
        {
            text: 'Empresa',
            iconCss: 'icon-bookmark icon',
            items: [
                { text: 'Datos Empresa - Sucursales - Cajas - Empleados' },
            ]
        },
        {
            text: 'Reportes',
            iconCss: 'icon-picture icon',
            items: [
                { text: 'Kardex' },
            ]
        },
        // {
        //     text: 'Usuario',
        //     iconCss: 'icon-user icon',
        //     items: [
        //         { text: 'Datos de Usuario' }
        //     ]
        // }
    ];

    public listFields: { [key: string]: Object } = { id: "id", text: "text", iconCss: "iconcss" };
    public selectedIndex = 0;
    // only for sample browser use
    constructor(private empresaService:EmpresasService, private shared: SharedService, private router: Router ) {
      console.log('Authenticated:', this.authService.authStatus());
    }
    toolbarCliked(args: ClickEventArgs) {
        if (args.item.tooltipText == "Menu") {
          this.sidebarMenuInstance.toggle();
          let samp = document.getElementsByClassName('sample_container');
          //hide/show the sample container based on sidebar open/close
          if (this.sidebarMenuInstance.isOpen) {
            (samp[0] as HTMLElement).style.display = 'block';
          } else {
            (samp[0] as HTMLElement).style.display = 'none';
          }
          //this.dockBar.toggle();
        }
    }
    onSelect(args: any) {
        console.log(args.item.text)
        this.selectedItem.set(args.item.text);
        //this.selectedIndex = args.index;
    }


    async ngOnInit() {
      localStorage.setItem('ActualEmpresa',JSON.stringify(this.miEmpresa));
      try {

        var respAsignaciones = await this.empresaService.getAllAsignacionesUsuario( this.actualEmpresa?.id_usuario || 0 );
        console.log(respAsignaciones, 'respuesta de asignaciones')
        if (respAsignaciones){
          respAsignaciones.forEach( async(asignacion:Asignacion_Sucursal) =>{
            try {
              var respEmpresa:any = await this.empresaService.getEmpresXSucursal(asignacion.id_sucursal);
              console.log(respEmpresa, 'Empresa asignada como cajero')
              if (respEmpresa){
                respEmpresa.id_caja = asignacion.id_caja;
                this.empresasCaja.push(respEmpresa);
                this.Empresa = [...this.Empresa,respEmpresa.nombre];
              }
            } catch (error) {
            }
          })
        }
        this.shared.updateEmpresasCaja(this.empresasCaja);
      } catch (error) {
        console.log('No hay asignaciones')
      }


    }

    public SeleccionEmpresa(ev:any){
      console.log(ev, 'dato en change');
      
      this.shared.updatefacturaActiva(null);
      this.shared.updateClienteFactura(null);
      this.shared.updatefacturaActual(0);
      this.shared.updatefacturaActualNo('');
      
      if (ev.item.textContent == this.miEmpresa?.nombre){
        this.Cargo=['Admin'];
      this.menuItems= [
              {
                  text: 'DashBoard',
                  iconCss: 'icon-bell-alt icon',
                  items: [
                      { text: 'DashBoard' }
                  ]
              },
              {
                  text: 'Datos',
                  iconCss: 'icon-bell-alt icon',
                  items: [
                      { text: 'Clientes/Proveedores' },
                      { text: 'Productos' }
                  ]
              },
              {
                  text: 'Ventas',
                  iconCss: 'icon-tag icon',
                  items: [
                      { text: 'Factura/Egreso' },
                      { text: 'Reporte Ventas' }
                  ]
              },
              // {
              //     text: 'Compras',
              //     iconCss: 'icon-comment-inv-alt2 icon',
              //     items: [
              //         { text: 'Compra/Ingreso' },
              //         { text: 'Reporte Compras' }
              //     ]
              // },
              {
                  text: 'Empresa',
                  iconCss: 'icon-bookmark icon',
                  items: [
                      { text: 'Datos Empresa - Sucursales - Cajas - Empleados' },
                  ]
              },
              {
                  text: 'Reportes',
                  iconCss: 'icon-picture icon',
                  items: [
                      { text: 'Kardex' },
                  ]
              },
              // {
              //     text: 'Usuario',
              //     iconCss: 'icon-user icon',
              //     items: [
              //         { text: 'Datos de Usuario' }
              //     ]
              // }
          ];
        localStorage.setItem('ActualEmpresa',JSON.stringify(this.miEmpresa));

        //window.location.reload();
          this.selectedItem.set('Dashboard');
      }else{
        this.Cargo=['Caja'];
        this.menuItems= [
                  {
                      text: 'DashBoard',
                      iconCss: 'icon-bell-alt icon',
                      items: [
                          { text: 'DashBoard' }
                      ]
                  },
                  {
                  text: 'Datos',
                  iconCss: 'icon-bell-alt icon',
                  items: [
                      { text: 'Clientes/Proveedores' },
                      { text: 'Productos' }
                  ]
                  },
                  {
                      text: 'Ventas',
                      iconCss: 'icon-tag icon',
                      items: [
                          { text: 'Factura/Egreso' },
                      ]
                  },

              ];
        localStorage.setItem('ActualEmpresa',JSON.stringify(this.empresasCaja.find(x=>x.nombre==ev.item.textContent)));
        this.selectedItem.set('Dashboard');
      }
    }


}


/*import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  authService = inject(AuthService);
}*/
