import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasporedSedenjaComponent } from './raspored-sedenja.component';

describe('RasporedSedenjaComponent', () => {
  let component: RasporedSedenjaComponent;
  let fixture: ComponentFixture<RasporedSedenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasporedSedenjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasporedSedenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
