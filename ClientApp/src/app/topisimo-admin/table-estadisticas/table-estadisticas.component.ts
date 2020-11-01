import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { TopisimoService } from '../../service/topisimo.service';

export interface Estadisticas {
  id: number;
  modelo: string;
  ganancia: number;
}

@Component({
  selector: 'app-table-estadisticas',
  templateUrl: './table-estadisticas.component.html',
  styleUrls: ['./table-estadisticas.component.css']
})
export class TableEstadisticasComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'modelo', 'ganancia'];
  estadisticas: Estadisticas[] = [];
  dataSource = new MatTableDataSource(this.estadisticas);
  sortedData: Estadisticas[];
  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageSize = 15;
  pedidosPaged: Estadisticas[] = [];

  constructor(private topisimoService: TopisimoService) {
    this.topisimoService.getEstadisticas().subscribe(x => { this.estadisticas = [...x]; this.pageChange(undefined)  });
  }

  pageChange(event: any) {
    this.pedidosPaged = [];
    const pageIndex = event ? event.pageIndex : 0;
    const pageSize = event ? event.pageSize : this.pageSize;
    for (let i = 0; i < this.estadisticas.slice((pageIndex*pageSize), ((pageIndex + 1) * pageSize)).length; i++) {
        let slicesEstadisticas = this.estadisticas.slice((pageIndex*pageSize), ((pageIndex + 1) * pageSize));
        this.pedidosPaged.push(slicesEstadisticas[i]);
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

  ngOnInit() {
    this.topisimoService.getEstadisticas().subscribe(x => { this.estadisticas = [...x]; this.pageChange(undefined)  });
    this.dataSource.sort = this.sort;
  }

}
