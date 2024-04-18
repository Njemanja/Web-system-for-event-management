import { TestBed } from '@angular/core/testing';
import { PonudaComponent } from './ponuda.component';
describe('PonudaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PonudaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PonudaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ponuda.component.spec.js.map