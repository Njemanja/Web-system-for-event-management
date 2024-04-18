import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PonudaInformacijeComponent = class PonudaInformacijeComponent {
    constructor(servis, router) {
        this.servis = servis;
        this.router = router;
        this.usluge = [];
        this.filter = [];
    }
    ngOnInit() {
        this.vrsta = localStorage.getItem("vrsta");
        this.servis.dohvatiUsluge("").subscribe((usl) => {
            this.usluge = usl;
            for (let i = 0; i < usl.length; i++) {
                if (this.usluge[i].status == this.vrsta || ((this.vrsta == "prostor") || (this.vrsta == "Restoran") || (this.vrsta == "Klub")
                    || (this.vrsta == "Bar") || (this.vrsta == "Splav") || (this.vrsta == "Brod") || (this.vrsta == "Kafić"))) {
                    this.filter.push(this.usluge[i]);
                }
            }
        });
    }
};
PonudaInformacijeComponent = __decorate([
    Component({
        selector: 'app-ponuda-informacije',
        templateUrl: './ponuda-informacije.component.html',
        styleUrls: ['./ponuda-informacije.component.css']
    })
], PonudaInformacijeComponent);
export { PonudaInformacijeComponent };
//# sourceMappingURL=ponuda-informacije.component.js.map