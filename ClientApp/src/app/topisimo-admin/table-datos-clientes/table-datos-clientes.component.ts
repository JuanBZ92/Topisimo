import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { TopisimoService } from '../../service/topisimo.service';

export interface DatosClientes {
  id: number;
  nombre: number;
  instagram: string;
  telefono: number;
  direccion: number;
}

@Component({
  selector: 'app-table-datos-clientes',
  templateUrl: './table-datos-clientes.component.html',
  styleUrls: ['./table-datos-clientes.component.css']
})
export class TableDatosClientesComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  pageEvent: PageEvent;
  displayedColumns: string[] = ['cliente', 'instagram', 'telefono', 'direccion'];
  datosClientes: DatosClientes[] = [];
  dataSource = new MatTableDataSource(this.datosClientes);
  sortedData: DatosClientes[];
  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageSize = 15;
  datosClientesPaged: DatosClientes[] = [];

  constructor(private topisimoService: TopisimoService) {
    this.topisimoService.getDatosClientes().subscribe(x => { this.datosClientes = [...x]; this.pageChange(undefined)  });
  }

  pageChange(event: any) {
    this.datosClientesPaged = [];
    const pageIndex = event ? event.pageIndex : 0;
    const pageSize = event ? event.pageSize : this.pageSize;
    for (let i = 0; i < this.datosClientes.slice((pageIndex*pageSize), ((pageIndex + 1) * pageSize)).length; i++) {
        let slicesDatosClientes = this.datosClientes.slice((pageIndex*pageSize), ((pageIndex + 1) * pageSize));
        this.datosClientesPaged.push(slicesDatosClientes[i]);
    }
    this.dataSource = new MatTableDataSource(this.datosClientesPaged);
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

  ngOnInit() {
    this.topisimoService.getDatosClientes().subscribe(x => { this.datosClientes = [...x]; this.pageChange(undefined)  });
    this.dataSource.sort = this.sort;
  }

}
