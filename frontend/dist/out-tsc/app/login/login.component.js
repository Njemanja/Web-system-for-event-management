import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    ngOnInit() {
    }
    register() {
        this.router.navigate(['/register']);
    }
    login() {
        if (!this.lozinka || !this.korisnickoIme) {
            this.poruka = "Niste uneli sve podatke.";
        }
        else {
            this.userService.login(this.korisnickoIme, this.lozinka).subscribe((user) => {
                if (user) {
                    localStorage.setItem('korisnickoIme', this.korisnickoIme);
                    if (this.korisnickoIme == "admin") {
                        this.router.navigate(['/admin']);
                    }
                    if (user.status == "Korisnik") {
                        this.router.navigate(['/korisnik']);
                    }
                    else {
                        this.router.navigate(['/usluge']);
                    }
                }
                else {
                    alert("Podaci nisu ispravni.");
                }
            });
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map