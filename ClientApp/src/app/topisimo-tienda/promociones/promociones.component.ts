import { Component, OnInit } from '@angular/core';
import { TopisimoService } from 'src/app/service/topisimo.service';
import { Productos } from '../galleria-detail/galleria-detail.component';
import { Categoria } from '../temporada/temporada.component';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

  imagesPosta: Productos[] = [];
  isLoading = true;

  constructor(private topisimoService: TopisimoService) { 
    this.topisimoService.getProductos(Categoria.Promociones).subscribe(x => { this.imagesPosta = x; this.isLoading = false });
  }

  ngOnInit() {
  }

}
