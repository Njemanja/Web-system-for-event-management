import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PozivnicaComponent } from './pozivnica.component';

describe('PozivnicaComponent', () => {
  let component: PozivnicaComponent;
  let fixture: ComponentFixture<PozivnicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PozivnicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PozivnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
