import { TestBed } from '@angular/core/testing';
import { KorisnikComponent } from './korisnik.component';
describe('KorisnikComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KorisnikComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(KorisnikComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=korisnik.component.spec.js.map