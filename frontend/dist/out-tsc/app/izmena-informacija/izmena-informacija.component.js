import { __decorate } from "tslib";
import { Component } from '@angular/core';
let IzmenaInformacijaComponent = class IzmenaInformacijaComponent {
    constructor(servis, router) {
        this.servis = servis;
        this.router = router;
        this.mojeUsluge = [];
    }
    ngOnInit() {
        this.korisnickoIme = localStorage.getItem("korisnickoIme");
        this.servis.dohvatiKorisnika(this.korisnickoIme).subscribe((user) => {
            this.ime = user.ime;
            this.prezime = user.prezime;
            this.email = user.email;
            this.telefon = user.telefon;
        });
    }
    izmeni() {
        if (this.korisnickoIme &&
            this.lozinka &&
            this.lozinka.length >= 8 &&
            this.lozinka === this.lozinka2 &&
            this.ime &&
            this.prezime &&
            this.telefon &&
            this.email &&
            this.email.includes('@')) {
            this.servis.izmeniInformacije(this.korisnickoIme, this.lozinka, this.ime, this.prezime, this.datum, this.telefon, this.email, this.status).subscribe((resp) => {
                if (resp['poruka'] == '1') {
                    this.poruka = "";
                    alert("Uspesno ste se izmenili informacije!");
                    localStorage.setItem("korisnickoIme", this.korisnickoIme);
                    this.router.navigate(['/usluge/profil/informacije']);
                }
                else if (resp['poruka'] == '2') {
                    this.poruka = "Korisnik sa datim email-om ili korisnickim imenom vec postoji!";
                }
                else {
                    this.poruka = "Niste uneli ispravne podatke!";
                }
            });
        }
        else {
            this.poruka = "Podaci nisu ispravni.\n Lozinka treba sadrzati najmanje 8 karaktera. \n Morate biti punoletni. ";
        }
    }
};
IzmenaInformacijaComponent = __decorate([
    Component({
        selector: 'app-izmena-informacija',
        templateUrl: './izmena-informacija.component.html',
        styleUrls: ['./izmena-informacija.component.css']
    })
], IzmenaInformacijaComponent);
export { IzmenaInformacijaComponent };
//# sourceMappingURL=izmena-informacija.component.js.map