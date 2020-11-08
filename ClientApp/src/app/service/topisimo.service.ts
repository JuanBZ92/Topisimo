import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DatosClientes } from '../topisimo-admin/table-datos-clientes/table-datos-clientes.component';
import { Estadisticas } from '../topisimo-admin/table-estadisticas/table-estadisticas.component';
import { Pedidos } from '../topisimo-admin/table-pedidos/table-pedidos.component';
import { Productos, QuieroProducto } from '../topisimo-tienda/galleria-detail/galleria-detail.component';
import { Categoria } from '../topisimo-tienda/temporada/temporada.component';

export interface Articulos {
  nombre: string;
  material: string;
  modelo: string;
  descripcion: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class TopisimoService {
  admin = new BehaviorSubject<boolean>(false);
  baseUrl = 'https://topisimocrochet.com/'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  constructor(private http: HttpClient) { 
  }

  getPedidos(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(this.baseUrl + 'api/topisimo').pipe(
      catchError((error: any) => { throw error; }),
      map(response => response as Pedidos[])
    );
  }

  getEstadisticas(): Observable<Estadisticas[]> {
    return this.http.get<Estadisticas[]>(this.baseUrl + 'api/topisimo/estadisticas').pipe(
      catchError((error: any) => { throw error; }),
      map(response => response as Estadisticas[])
    );
  }

  getDatosClientes(): Observable<DatosClientes[]> {
    return this.http.get<DatosClientes[]>(this.baseUrl + 'api/topisimo/datos').pipe(
      catchError((error: any) => { throw error; }),
      map(response => response as DatosClientes[])
    );
  }

  getProductos(categoria: Categoria): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.baseUrl + 'api/topisimo/productos/' + categoria).pipe(
      catchError((error: any) => { throw error; }),
      map(response => response as Productos[])
    );
  }

  guardarPedido(pedido: Pedidos): Observable<Pedidos> {
    return this.http.post<Pedidos>(this.baseUrl + 'api/topisimo', pedido, this.httpOptions).pipe(
      catchError((error: any) => { throw error; }),
      map(response => response as Pedidos)
    );
  }

  sendEmail(pedido: QuieroProducto): Observable<QuieroProducto> {
    return this.http.post<QuieroProducto>(this.baseUrl + 'api/topisimo/sendemail', pedido, this.httpOptions).pipe(
      catchError((error: any) => { throw error; }),
      map(response => response as QuieroProducto)
    );
  }
  
}
