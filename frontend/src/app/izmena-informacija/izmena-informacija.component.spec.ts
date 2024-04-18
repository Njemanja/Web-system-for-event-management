import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaInformacijaComponent } from './izmena-informacija.component';

describe('IzmenaInformacijaComponent', () => {
  let component: IzmenaInformacijaComponent;
  let fixture: ComponentFixture<IzmenaInformacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaInformacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzmenaInformacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
