import { TestBed } from '@angular/core/testing';
import { IzmenaInformacijaComponent } from './izmena-informacija.component';
describe('IzmenaInformacijaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IzmenaInformacijaComponent]
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
//# sourceMappingURL=izmena-informacija.component.spec.js.map