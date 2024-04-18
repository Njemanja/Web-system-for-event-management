import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProfilUslugaComponent = class ProfilUslugaComponent {
    constructor(servis, router) {
        this.servis = servis;
        this.router = router;
        this.index = 0;
        this.items = [];
        this.mojeUsluge = [];
        this.galerija = [
            'assets/slika3.jpg',
            'assets/logo.jpg'
        ];
        this.naredneUsluge = [];
    }
    ngOnInit() {
        localStorage.setItem("usluga", null);
        this.korisnickoIme = localStorage.getItem("korisnickoIme");
        this.image = this.galerija[0];
        this.servis.dohvatiKalendar(this.korisnickoIme).subscribe((kalendar) => {
            this.items = kalendar.niz;
            if (this.items == null) {
                this.items = [];
            }
            this.pronadjiNaredneUsluge();
        });
        this.servis.dohvatiKorisnika(this.korisnickoIme).subscribe((user) => {
            this.ime = user.ime;
            this.prezime = user.prezime;
            this.email = user.email;
            this.telefon = user.telefon;
        });
        this.servis.dohvatiUsluge(this.korisnickoIme).subscribe((usluge) => {
            this.mojeUsluge = usluge;
        });
    }
    prevImage() {
        this.index -= 1;
        if (this.index == -1) {
            this.index = this.galerija.length;
        }
        this.image = this.galerija[this.index];
    }
    nextImage() {
        this.index = (this.index + 1) % this.galerija.length;
        this.image = this.galerija[this.index];
    }
    pronadjiNaredneUsluge() {
        // Sortirajte sve usluge po datumu
        const sortiraneUsluge = [...this.items].sort((a, b) => {
            return new Date(a.datum).getTime() - new Date(b.datum).getTime();
        });
        // Filtrirajte usluge koje su u budućnosti (posle trenutnog datuma)
        const trenutniDatum = new Date();
        const buduceUsluge = sortiraneUsluge.filter((usluga) => {
            const uslugaDatum = new Date(usluga.datum);
            return uslugaDatum > trenutniDatum;
        });
        // Prvo uklonite sve prethodno pronađene naredne usluge
        this.naredneUsluge = [];
        // Zatim dodajte prvih 5 narednih usluga u niz naredneUsluge
        for (let i = 0; i < Math.min(5, buduceUsluge.length); i++) {
            this.naredneUsluge.push(buduceUsluge[i]);
        }
    }
    sacuvajID(ime) {
        localStorage.setItem("usluga", ime);
    }
};
ProfilUslugaComponent = __decorate([
    Component({
        selector: 'app-profil-usluga',
        templateUrl: './profil-usluga.component.html',
        styleUrls: ['./profil-usluga.component.css']
    })
], ProfilUslugaComponent);
export { ProfilUslugaComponent };
//# sourceMappingURL=profil-usluga.component.js.map