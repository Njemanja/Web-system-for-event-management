import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AdminComponent = class AdminComponent {
    constructor(servis, router, renderer) {
        this.servis = servis;
        this.router = router;
        this.renderer = renderer;
        this.us = [];
        this.trenutnaSlikaIndex = [];
    }
    ngOnInit() {
        this.servis.dohvatiUsluge().subscribe((usluge) => {
            this.us = usluge;
            // Inicijalizujte indekse za svaku uslugu na 0
            this.trenutnaSlikaIndex = usluge.map(() => 0);
        });
    }
    galerija(g) {
        const galerijaJSON = JSON.stringify(g);
        localStorage.setItem("galerija", galerijaJSON);
    }
    potvrdi(id) {
        this.servis.potvrdi(id).subscribe((usl) => {
            if (usl) {
                location.reload();
            }
        });
    }
};
AdminComponent = __decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './admin.component.html',
        styleUrls: ['./admin.component.css']
    })
], AdminComponent);
export { AdminComponent };
//# sourceMappingURL=admin.component.js.map