import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazRasporedaComponent } from './prikaz-rasporeda.component';

describe('PrikazRasporedaComponent', () => {
  let component: PrikazRasporedaComponent;
  let fixture: ComponentFixture<PrikazRasporedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazRasporedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrikazRasporedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
