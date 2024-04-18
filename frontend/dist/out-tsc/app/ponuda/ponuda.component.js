import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PonudaComponent = class PonudaComponent {
    constructor(servis, router) {
        this.servis = servis;
        this.router = router;
    }
    ngOnInit() {
    }
    ponuda(s) {
        localStorage.setItem("vrsta", s);
    }
};
PonudaComponent = __decorate([
    Component({
        selector: 'app-ponuda',
        templateUrl: './ponuda.component.html',
        styleUrls: ['./ponuda.component.css']
    })
], PonudaComponent);
export { PonudaComponent };
//# sourceMappingURL=ponuda.component.js.map