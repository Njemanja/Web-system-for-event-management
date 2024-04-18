import { TestBed } from '@angular/core/testing';
import { UslugeComponent } from './usluge.component';
describe('UslugeComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UslugeComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(UslugeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=usluge.component.spec.js.map