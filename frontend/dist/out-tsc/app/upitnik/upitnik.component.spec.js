import { TestBed } from '@angular/core/testing';
import { UpitnikComponent } from './upitnik.component';
describe('UpitnikComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpitnikComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(UpitnikComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=upitnik.component.spec.js.map