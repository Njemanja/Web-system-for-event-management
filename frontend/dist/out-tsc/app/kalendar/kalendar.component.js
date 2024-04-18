import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Kalendar } from '../models/kalendar';
import { saveAs } from 'file-saver';
let KalendarComponent = class KalendarComponent {
    constructor(servis, router) {
        this.servis = servis;
        this.router = router;
        this.items = []; // Vaši podaci
        this.displayedItems = []; // Prikazani podaci
        this.itemsPerPage = 5; // Broj redova po stranici
        this.currentPage = 1; // Trenutna stranica
        this.ukupno = 0;
        this.prosleProslave = [];
    }
    ngOnInit() {
        this.korisnickoIme = localStorage.getItem("korisnickoIme");
        this.servis.dohvatiKalendar(this.korisnickoIme).subscribe((kalendar) => {
            this.items = kalendar.niz;
            if (this.items == null) {
                this.items = [];
            }
            this.loadMore();
            this.zadaradjeno();
        });
        this.loadMore();
    }
    izvestaj() {
        const izvestaj = this.generateReport(); // Funkcija koja generiše izveštaj
        const blob = new Blob([izvestaj], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'izvestaj.txt');
    }
    generateReport() {
        // Grupišite proslave po mesecima i godinama i izračunajte sumu novca
        const groupedData = {};
        this.items.forEach((proslava) => {
            const datum = new Date(proslava.datum);
            const mesecGodina = `${datum.getMonth() + 1}-${datum.getFullYear()}`;
            if (!groupedData[mesecGodina]) {
                groupedData[mesecGodina] = 0;
            }
            groupedData[mesecGodina] += 1 * proslava.novac;
        });
        // Formatirajte izveštaj
        let izvestaj = 'Izvestaj o prihodima po mesecima i godinama:\n\n';
        for (const kljuc in groupedData) {
            if (groupedData.hasOwnProperty(kljuc)) {
                const mesecGodina = kljuc;
                const suma = groupedData[kljuc];
                izvestaj += `${mesecGodina}: ${suma} e\n`; // Bez toFixed()
            }
        }
        return izvestaj;
    }
    izvestajY() {
        const izvestaj = this.generateReportByYear(); // Funkcija koja generiše izveštaj
        const blob = new Blob([izvestaj], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'izvestaj.txt');
    }
    generateReportByYear() {
        // Grupišite proslave po godinama i izračunajte sumu novca
        const groupedData = {};
        this.items.forEach((proslava) => {
            const datum = new Date(proslava.datum);
            const godina = datum.getFullYear().toString();
            if (!groupedData[godina]) {
                groupedData[godina] = 0;
            }
            groupedData[godina] += 1 * proslava.novac;
        });
        // Formatirajte izveštaj
        let izvestaj = 'Izvestaj o prihodima po godinama:\n\n';
        for (const kljuc in groupedData) {
            if (groupedData.hasOwnProperty(kljuc)) {
                const godina = kljuc;
                const suma = groupedData[kljuc];
                izvestaj += `${godina}: ${suma} RSD\n`; // Bez toFixed()
            }
        }
        return izvestaj;
    }
    loadMore() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        if (startIndex < this.items.length) {
            const nextItems = this.items.slice(startIndex, endIndex);
            this.displayedItems = [...this.displayedItems, ...nextItems];
            this.currentPage++;
        }
    }
    obrisiRed(index) {
        if (index >= 0 && index < this.displayedItems.length) {
            const deletedItem = this.displayedItems.splice(index, 1)[0]; // Ukloni red sa datim indeksom i sačuvaj ga
            const itemIndex = this.items.findIndex(item => item === deletedItem);
            if (itemIndex !== -1) {
                this.items.splice(itemIndex, 1);
            }
            this.zadaradjeno();
            this.dodajUBazu();
        }
    }
    dodajUBazu() {
        this.servis.dodajKalendar(this.items, this.korisnickoIme).subscribe(() => {
        });
    }
    dodajRed() {
        let k = new Kalendar();
        k.datum = this.datum;
        k.mesto = this.mesto;
        k.email = this.email;
        k.novac = this.novac;
        k.telefon = this.telefon;
        k.pozivalac = this.pozivalac;
        this.items.push(k);
        this.displayedItems.unshift(k);
        this.zadaradjeno();
        this.dodajUBazu();
    }
    // Funkcija za sortiranje po datumu (rastući redosled)
    sortirajPoDatumu() {
        this.displayedItems.sort((a, b) => {
            return new Date(a.datum).getTime() - new Date(b.datum).getTime();
        });
    }
    // Funkcija za sortiranje po novcu (rastući redosled)
    sortirajPoNovcu() {
        this.displayedItems.sort((a, b) => {
            return a.novac - b.novac;
        });
    }
    // Funkcija za obrtno sortiranje po datumu
    obrnutoSortirajPoDatumu() {
        this.displayedItems.sort((a, b) => {
            return new Date(b.datum).getTime() - new Date(a.datum).getTime();
        });
    }
    // Funkcija za obrtno sortiranje po novcu
    obrnutoSortirajPoNovcu() {
        this.displayedItems.sort((a, b) => {
            return b.novac - a.novac;
        });
    }
    zadaradjeno() {
        const trenutniDatum = new Date();
        this.prosleProslave = this.items.filter((proslava) => {
            const proslavaDatum = new Date(proslava.datum);
            return proslavaDatum < trenutniDatum;
        });
        let u = 0;
        this.prosleProslave.forEach((proslava) => {
            if (proslava) {
                u += parseFloat(proslava.novac);
            }
        });
        this.ukupno = u;
    }
};
KalendarComponent = __decorate([
    Component({
        selector: 'app-kalendar',
        templateUrl: './kalendar.component.html',
        styleUrls: ['./kalendar.component.css']
    })
], KalendarComponent);
export { KalendarComponent };
//# sourceMappingURL=kalendar.component.js.map