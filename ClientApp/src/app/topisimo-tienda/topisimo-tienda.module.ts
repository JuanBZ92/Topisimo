import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule, MatButtonModule} from '@angular/material/';

import {GalleriaModule} from 'primeng/galleria';

import { TemporadaComponent } from './temporada/temporada.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { CardsCarouselComponent } from './cards-carousel/cards-carousel.component';
import { GalleriaDetailComponent } from './galleria-detail/galleria-detail.component';
import { QuieroProductoComponent } from './quiero-producto/quiero-producto.component';



@NgModule({
  declarations: [TemporadaComponent, PromocionesComponent, AccesoriosComponent, CardsCarouselComponent, GalleriaDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    GalleriaModule,
    MatCardModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopisimoTiendaModule { }
