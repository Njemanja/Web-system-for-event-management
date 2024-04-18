import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AdminService = class AdminService {
    constructor(http) {
        this.http = http;
        this.uri = 'http://127.0.0.1:4000';
    }
    dohvatiUsluge() {
        const data = {};
        return this.http.post(`${this.uri}/admin/dohvati`, data);
    }
    potvrdi(id) {
        const data = { id: id };
        return this.http.post(`${this.uri}/admin/potvrdi`, data);
    }
};
AdminService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AdminService);
export { AdminService };
//# sourceMappingURL=admin.service.js.map