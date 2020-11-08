import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablePedidosComponent } from './topisimo-admin/table-pedidos/table-pedidos.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TopisimoService } from './service/topisimo.service';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { TableEstadisticasComponent } from './topisimo-admin/table-estadisticas/table-estadisticas.component';
import { TableDatosClientesComponent } from './topisimo-admin/table-datos-clientes/table-datos-clientes.component';
import { ModalComponent } from './modal/modal.component';
import { AddPedidoComponent } from './topisimo-admin/add-pedido/add-pedido.component';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { GaleriaComponent } from './galeria/galeria.component';
import { TemporadaComponent } from './topisimo-tienda/temporada/temporada.component';
import { AccesoriosComponent } from './topisimo-tienda/accesorios/accesorios.component';
import { TopisimoAdminModule } from './topisimo-admin/topisimo-admin.module';
import { TopisimoTiendaModule } from './topisimo-tienda/topisimo-tienda.module';
import {GalleriaModule} from 'primeng/galleria';
import { GalleriaDetailComponent } from './topisimo-tienda/galleria-detail/galleria-detail.component';
import { QuieroProductoComponent } from './topisimo-tienda/quiero-producto/quiero-producto.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TableEstadisticasComponent,
    TableDatosClientesComponent,
    TablePedidosComponent,
    ModalComponent,
    AddPedidoComponent,
    QuieroProductoComponent,
    GaleriaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TopisimoAdminModule,
    GalleriaModule,
    TopisimoTiendaModule,
    RouterModule.forRoot([
      { path: '', component: GaleriaComponent, pathMatch: 'full' },
      { path: 'pedidos', component: TablePedidosComponent },
      { path: 'estadisticas', component: TableEstadisticasComponent },
      { path: 'datos', component: TableDatosClientesComponent },
      { path: 'temporada', component: TemporadaComponent },
      { path: 'accesorios', component: AccesoriosComponent },
      { path: 'login', component: LoginComponent },
    ]),
    NgbModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  entryComponents: [
    AddPedidoComponent,
    QuieroProductoComponent
  ],
  providers: [TopisimoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
