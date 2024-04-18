import { __decorate } from "tslib";
import { Component } from '@angular/core';
let SupportComponent = class SupportComponent {
    constructor(servis, router) {
        this.servis = servis;
        this.router = router;
    }
    ngOnInit() {
        this.email = "";
    }
    send() {
        this.servis.send(this.korisnickoIme, this.text, this.email).subscribe((resp) => {
            alert("Uspesno ste poslali poruku.");
            this.text = "";
        });
    }
    letovi() {
        this.router.navigate(['/flights']);
    }
};
SupportComponent = __decorate([
    Component({
        selector: 'app-support',
        templateUrl: './support.component.html',
        styleUrls: ['./support.component.css']
    })
], SupportComponent);
export { SupportComponent };
//# sourceMappingURL=support.component.js.map