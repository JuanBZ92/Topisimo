import { Component, OnInit } from '@angular/core';
import { TopisimoService } from '../service/topisimo.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private topisimoService: TopisimoService) {
    this.links = this.userLinks;
  }
  links = [];
  isExpanded = false;
  activeLink = '/';
  userLinks = [{label: 'Home', link: '/'},{label: 'Temporada', link: '/temporada'},{label: 'Accesorios', link: '/accesorios'}, {label: 'Login', link: '/login'}]
  adminLinks = [{label: 'Home', link: '/'},{label: 'Pedidos', link: '/pedidos'},{label: 'Estadisticas', link: '/estadisticas'},{label: 'Datos Clientes', link: '/datos'}]
  
  collapse() {
    this.isExpanded = false;
  }

  ngOnInit() {
    this.topisimoService.admin.subscribe(x => {
      if (x) {
        this.links = this.adminLinks;
      } else {
        this.links = this.userLinks;
      }
    })
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
