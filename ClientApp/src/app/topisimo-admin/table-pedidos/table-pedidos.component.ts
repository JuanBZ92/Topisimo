import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TopisimoService } from '../../service/topisimo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';

export interface Pedidos {
  id: number;
  fecha: Date;
  cliente: string;
  modelo: string;
  color: string;
  peso: number;
  costo: number;
  busto: number;
  bajoBusto: number;
  tasa: number;
  cintura: number;
  precio: number;
  estado: string;
  notas: string;
}

@Component({
  selector: 'app-table-pedidos',
  templateUrl: './table-pedidos.component.html',
  styleUrls: ['./table-pedidos.component.css']
})
export class TablePedidosComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'fecha', 'cliente', 'modelo', 'color', 'costo', 'peso', 'busto', 'bajoBusto', 'tasa', 'cintura', 'precio', 'estado', 'notas'];
  pedidos: Pedidos[] = [];
  dataSource = new MatTableDataSource(this.pedidos);
  sortedData: Pedidos[];
  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageSize = 15;
  pedidosPaged: Pedidos[] = [];

  constructor(private topisimoService: TopisimoService) {
    this.topisimoService.getPedidos().subscribe(x => { this.pedidos = [...x]; this.pageChange(undefined)  });
  }

  pageChange(event: any) {
    this.pedidosPaged = [];
    const pageIndex = event ? event.pageIndex : 0;
    const pageSize = event ? event.pageSize : this.pageSize;
    for (let i = 0; i < this.pedidos.slice((pageIndex*pageSize), ((pageIndex + 1) * pageSize)).length; i++) {
        let slicesPedidos = this.pedidos.slice((pageIndex*pageSize), ((pageIndex + 1) * pageSize));
        this.pedidosPaged.push(slicesPedidos[i]);
    }
    this.dataSource = new MatTableDataSource(this.pedidosPaged);
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  abrirModalAgregarPedido() {
    this.modal.abrirAgregarPedido();
  }

  guardarPedido(pedido: Pedidos) {
    this.topisimoService.guardarPedido(pedido);
  }

  ngOnInit() {
    this.topisimoService.getPedidos().subscribe(x => { this.pedidos = [...x]; this.pageChange(undefined)  });
    this.dataSource.sort = this.sort;
  }

}
