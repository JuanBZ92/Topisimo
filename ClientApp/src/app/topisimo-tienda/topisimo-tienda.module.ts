import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule, MatButtonModule} from '@angular/material/';

import {GalleriaModule} from 'primeng/galleria';

import { TemporadaComponent } from './temporada/temporada.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import { GalleriaDetailComponent } from './galleria-detail/galleria-detail.component';



@NgModule({
  declarations: [TemporadaComponent, AccesoriosComponent, GalleriaDetailComponent],
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
