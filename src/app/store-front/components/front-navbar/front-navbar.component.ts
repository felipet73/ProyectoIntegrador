import { Component, ViewEncapsulation, inject, ViewChild, signal } from '@angular/core';
import { SidebarComponent, ClickEventArgs, ToolbarModule, SidebarModule, MenuItemModel, MenuModule } from '@syncfusion/ej2-angular-navigations';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';

import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { AuthService } from '@auth/services/auth.service';
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
    public Empresa: string[] = ['Market El Surtido', 'Mini Market Carola'];
    public Cargo: string[] = ['Admin', 'Caja'];
    authService = inject(AuthService);
    @ViewChild('dockBar')
    public dockBar!: SidebarComponent;
    public enableDock: boolean = true;
    public showIcon: boolean = true;

    public dockSize: string = '50px';
    public width: string = '220px';
    public target: string = '.main-menu-content';

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
        {
            text: 'Compras',
            iconCss: 'icon-comment-inv-alt2 icon',
            items: [
                { text: 'Compra/Ingreso' },
                { text: 'Reporte Compras' }
            ]
        },
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
        {
            text: 'Usuario',
            iconCss: 'icon-user icon',
            items: [
                { text: 'Datos de Usuario' }
            ]
        }
    ];

    public listFields: { [key: string]: Object } = { id: "id", text: "text", iconCss: "iconcss" };
    public selectedIndex = 0;
    // only for sample browser use
    constructor() {
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
