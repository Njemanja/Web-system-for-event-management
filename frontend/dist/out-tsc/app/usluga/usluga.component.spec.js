import { TestBed } from '@angular/core/testing';
import { UslugaComponent } from './usluga.component';
describe('UslugaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UslugaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(UslugaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=usluga.component.spec.js.map