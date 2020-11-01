import { Component, OnInit } from '@angular/core';
import { Articulos, TopisimoService } from 'src/app/service/topisimo.service';
import { Productos } from '../galleria-detail/galleria-detail.component';
import { Categoria } from '../temporada/temporada.component';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit {

  imagesPosta: Productos[] = [];
  isLoading = true;

  constructor(private topisimoService: TopisimoService) { 
    this.topisimoService.getProductos(Categoria.Accesorios).subscribe(x => { this.imagesPosta = x; this.isLoading = false });
  }

  ngOnInit() {
  }

}
