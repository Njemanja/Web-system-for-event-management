import { TestBed } from '@angular/core/testing';
import { GalerijaAdminComponent } from './galerija-admin.component';
describe('GalerijaAdminComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GalerijaAdminComponent]
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
//# sourceMappingURL=galerija-admin.component.spec.js.map