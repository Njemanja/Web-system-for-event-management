import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerijaAdminComponent } from './galerija-admin.component';

describe('GalerijaAdminComponent', () => {
  let component: GalerijaAdminComponent;
  let fixture: ComponentFixture<GalerijaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalerijaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalerijaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
