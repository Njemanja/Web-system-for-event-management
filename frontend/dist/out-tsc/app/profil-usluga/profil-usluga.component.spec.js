import { TestBed } from '@angular/core/testing';
import { ProfilUslugaComponent } from './profil-usluga.component';
describe('ProfilUslugaComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfilUslugaComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ProfilUslugaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=profil-usluga.component.spec.js.map