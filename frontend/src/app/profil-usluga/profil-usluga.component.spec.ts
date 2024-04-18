import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUslugaComponent } from './profil-usluga.component';

describe('ProfilUslugaComponent', () => {
  let component: ProfilUslugaComponent;
  let fixture: ComponentFixture<ProfilUslugaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilUslugaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilUslugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
