import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEstadisticasComponent } from './table-estadisticas.component';

describe('TableEstadisticasComponent', () => {
  let component: TableEstadisticasComponent;
  let fixture: ComponentFixture<TableEstadisticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEstadisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
