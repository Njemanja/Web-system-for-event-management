import { TestBed } from '@angular/core/testing';
import { KalendarComponent } from './kalendar.component';
describe('KalendarComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KalendarComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(KalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=kalendar.component.spec.js.map