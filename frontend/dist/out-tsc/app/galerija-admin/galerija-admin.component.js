import { __decorate } from "tslib";
import { Component } from '@angular/core';
let GalerijaAdminComponent = class GalerijaAdminComponent {
    constructor() {
        this.galerija = [];
    }
    ngOnInit() {
        this.galerija = JSON.parse(localStorage.getItem("galerija"));
    }
};
GalerijaAdminComponent = __decorate([
    Component({
        selector: 'app-galerija-admin',
        templateUrl: './galerija-admin.component.html',
        styleUrls: ['./galerija-admin.component.css']
    })
], GalerijaAdminComponent);
export { GalerijaAdminComponent };
//# sourceMappingURL=galerija-admin.component.js.map