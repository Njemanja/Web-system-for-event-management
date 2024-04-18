import { __decorate } from "tslib";
import { Component } from '@angular/core';
let UpitnikComponent = class UpitnikComponent {
    constructor(route) {
        this.route = route;
        this.ime = '1';
    }
    ngOnInit() {
        // Izvući JSON podatke iz rute
        this.route.paramMap.subscribe(params => {
            const jsondata = params.get('jsondata');
            try {
                this.jsonData = JSON.parse(decodeURIComponent(jsondata));
                this.ime = this.jsonData.ime;
            }
            catch (error) {
                console.error('Nije moguće parsirati JSON podatke.', error);
            }
        });
    }
};
UpitnikComponent = __decorate([
    Component({
        selector: 'app-upitnik',
        templateUrl: './upitnik.component.html',
        styleUrls: ['./upitnik.component.css']
    })
], UpitnikComponent);
export { UpitnikComponent };
//# sourceMappingURL=upitnik.component.js.map