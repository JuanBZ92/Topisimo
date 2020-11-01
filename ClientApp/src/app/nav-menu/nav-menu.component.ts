import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  activeLink = '/';
  userLinks = [{label: 'Home', link: '/'},{label: 'Temporada', link: '/temporada'},{label: 'Ofertas', link: '/ofertas'},{label: 'Accesorios', link: '/accesorios'}]
  adminLinks = [{label: 'Home', link: '/'},{label: 'Pedidos', link: '/pedidos'},{label: 'Estadisticas', link: '/estadisticas'},{label: 'Datos Clientes', link: '/datos'}]
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
