import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriaDetailComponent } from './galleria-detail.component';

describe('GalleriaDetailComponent', () => {
  let component: GalleriaDetailComponent;
  let fixture: ComponentFixture<GalleriaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleriaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
