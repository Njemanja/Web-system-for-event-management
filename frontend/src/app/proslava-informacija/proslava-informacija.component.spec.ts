import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProslavaInformacijaComponent } from './proslava-informacija.component';

describe('ProslavaInformacijaComponent', () => {
  let component: ProslavaInformacijaComponent;
  let fixture: ComponentFixture<ProslavaInformacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProslavaInformacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProslavaInformacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
