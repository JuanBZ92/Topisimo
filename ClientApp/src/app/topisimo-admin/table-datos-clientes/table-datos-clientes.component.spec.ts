import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatosClientesComponent } from './table-datos-clientes.component';

describe('TableDatosClientesComponent', () => {
  let component: TableDatosClientesComponent;
  let fixture: ComponentFixture<TableDatosClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDatosClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDatosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
