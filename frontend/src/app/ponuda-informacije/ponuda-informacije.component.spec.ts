import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudaInformacijeComponent } from './ponuda-informacije.component';

describe('PonudaInformacijeComponent', () => {
  let component: PonudaInformacijeComponent;
  let fixture: ComponentFixture<PonudaInformacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonudaInformacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PonudaInformacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
