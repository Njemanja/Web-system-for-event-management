import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JednaPonudaComponent } from './jedna-ponuda.component';

describe('JednaPonudaComponent', () => {
  let component: JednaPonudaComponent;
  let fixture: ComponentFixture<JednaPonudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JednaPonudaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JednaPonudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
