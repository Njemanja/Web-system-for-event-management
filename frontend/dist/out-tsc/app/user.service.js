import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.uri = 'http://127.0.0.1:4000';
    }
    login(korisnickoIme, lozinka) {
        const data = {
            korisnickoIme: korisnickoIme,
            lozinka: lozinka
        };
        return this.http.post(`${this.uri}/users/login`, data);
    }
    register(korisnickoIme, lozinka, ime, prezime, datumRodjenja, telefon, email, status) {
        const data = {
            korisnickoIme: korisnickoIme,
            lozinka: lozinka,
            ime: ime,
            prezime: prezime,
            datumRodjenja: datumRodjenja,
            telefon: telefon,
            email: email,
            status: status
        };
        return this.http.post(`${this.uri}/users/register`, data);
    }
    izmeniInformacije(korisnickoIme, lozinka, ime, prezime, datumRodjenja, telefon, email, status) {
        const data = {
            korisnickoIme: korisnickoIme,
            lozinka: lozinka,
            ime: ime,
            prezime: prezime,
            datumRodjenja: datumRodjenja,
            telefon: telefon,
            email: email,
            status: status
        };
        return this.http.post(`${this.uri}/users/izmeniInformacije`, data);
    }
    dodajKalendar(niz, k) {
        const data = {
            kalendar: niz,
            korisnickoIme: k
        };
        return this.http.post(`${this.uri}/users/dodajKalendar`, data);
    }
    dohvatiKalendar(k) {
        const data = {
            korisnickoIme: k
        };
        return this.http.post(`${this.uri}/users/dohvatiKalendar`, data);
    }
    dohvatiUslugu(k) {
        const data = {
            id: k
        };
        return this.http.post(`${this.uri}/users/dohvatiUslugu`, data);
    }
    send(korisnickoIme, text, mail) {
        const data = {
            korisnickoIme: korisnickoIme,
            text: text,
            mail: mail
        };
        return this.http.post(`${this.uri}/users/support`, data);
    }
    dodajUslugu(ime, mesto, telefon, email, galerija, vrsta, text, stolovi, kIme) {
        const data = {
            ime: ime,
            mesto: mesto,
            telefon: telefon,
            email: email,
            galerija: galerija,
            opis: text,
            stolovi: stolovi,
            vrsta: vrsta,
            korisnickoIme: kIme
        };
        return this.http.post(`${this.uri}/users/dodajUslugu`, data);
    }
    izmeniUslugu(ime, mesto, telefon, email, galerija, vrsta, text, stolovi, kIme, id) {
        const data = {
            ime: ime,
            mesto: mesto,
            telefon: telefon,
            email: email,
            galerija: galerija,
            opis: text,
            stolovi: stolovi,
            vrsta: vrsta,
            korisnickoIme: kIme,
            id: id
        };
        return this.http.post(`${this.uri}/users/izmeniUslugu`, data);
    }
    dohvatiKorisnika(korisnickoIme) {
        const data = {
            korisnickoIme: korisnickoIme
        };
        return this.http.post(`${this.uri}/users/dohvatiKorisnika`, data);
    }
    dohvatiUsluge(korisnickoIme) {
        const data = {
            korisnickoIme: korisnickoIme
        };
        return this.http.post(`${this.uri}/users/dohvatiUsluge`, data);
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map