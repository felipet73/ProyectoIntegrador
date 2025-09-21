//componente basico de informacion
import { Component } from '@angular/core';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { RouterLink } from '@angular/router';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [ToolbarModule, RouterLink],
  templateUrl: './information.component.html',
  //styleUrls: ['./information.component.css']
})

export class InformationComponent {
  public items: Object[] = [
    { text: 'About Us', prefixIcon: 'e-icons e-info', align: 'Left', routerLink: '/about' },
    { text: 'Contact', prefixIcon: 'e-icons e-phone', align: 'Left', routerLink: '/contact' },
    { text: 'Help', prefixIcon: 'e-icons e-help', align: 'Left', routerLink: '/help' }
  ];
  public clicked(args: ClickEventArgs): void {
    console.log(args.item.text + ' has been clicked');
  }
}
