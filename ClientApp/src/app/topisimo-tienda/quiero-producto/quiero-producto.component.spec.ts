import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuieroProductoComponent } from './quiero-producto.component';

describe('QuieroProductoComponent', () => {
  let component: QuieroProductoComponent;
  let fixture: ComponentFixture<QuieroProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuieroProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuieroProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
