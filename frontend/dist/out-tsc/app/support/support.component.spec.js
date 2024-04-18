import { TestBed } from '@angular/core/testing';
import { SupportComponent } from './support.component';
describe('SupportComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SupportComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(SupportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=support.component.spec.js.map