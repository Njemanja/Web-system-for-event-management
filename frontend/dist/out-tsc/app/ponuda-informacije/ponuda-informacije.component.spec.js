import { TestBed } from '@angular/core/testing';
import { PonudaInformacijeComponent } from './ponuda-informacije.component';
describe('PonudaInformacijeComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PonudaInformacijeComponent]
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
//# sourceMappingURL=ponuda-informacije.component.spec.js.map