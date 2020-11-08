import { Component, OnInit, ViewChild } from '@angular/core';
import { Articulos, TopisimoService } from 'src/app/service/topisimo.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Productos, QuieroProducto } from '../galleria-detail/galleria-detail.component';

export enum Categoria {
  Temporada = 0,
  Promociones = 1,
  Accesorios = 2
}
@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.component.html',
  styleUrls: ['./temporada.component.css']
})
export class TemporadaComponent implements OnInit {
  @ViewChild('modal', { static: false }) modal: ModalComponent;

  imagesPosta: Productos[] = [];
  isLoading = true;
  constructor(private topisimoService: TopisimoService) { 
    this.topisimoService.getProductos(Categoria.Temporada).subscribe(x => { this.imagesPosta = x; this.isLoading = false });
  }

  ngOnInit() {
  }


}
