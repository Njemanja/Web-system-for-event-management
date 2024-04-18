import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Sto } from '../models/sto';
let UslugeComponent = class UslugeComponent {
    constructor(elementRef, renderer, servis, router) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.servis = servis;
        this.router = router;
        this.stoloviCanvas = [];
        this.galerija = [];
        this.slikaDobra = false;
        this.showAdditionalFields = false; // Promenljiva za prikazivanje/skrivanje dodatnih polja
        this.isChecked = false;
        this.isChecked1 = false;
        this.stolovi = [];
        this.vrstaStola = 'Okrugli';
        this.showAdditionalStolFields = false;
        this.precnikStola = 0;
        this.brojStolicaOkrugli = 0;
        this.sirinaStola = 0;
        this.duzinaStola = 0;
        this.brojStolicaPravougaoni = 0;
        this.brojStolicaPravougaoniDuzina = 0;
        this.brojStolicaPravougaoniSirina = 0;
    }
    ngOnInit() {
        this.stolovi = [];
        /*var map = L.map('map').setView([51.505, -0.09], 13); // Set the initial view
  
        // Add a tile layer (for example, OpenStreetMap)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
  
        // Add a marker to the map
        var marker = L.marker([51.505, -0.09]).addTo(map);
        */
    }
    ngAfterViewInit() {
        this.imaUGaleriji = false;
        this.vrsta = 'Muzika';
    }
    vrstaStolaChanged() {
        this.showAdditionalStolFields = (this.vrsta === 'Restoran' || this.vrsta === 'Kafić') && this.vrstaStola === 'Okrugli';
    }
    promeni() {
        this.isChecked = !this.isChecked;
    }
    promeni1() {
        this.isChecked1 = !this.isChecked1;
    }
    dodajSto(precnikStola, brojStolicaOkrugli, sirinaStola, duzinaStola, brojStolicaPravougaoni, vrstaStola) {
        // Kreirajte <canvas> element
        if (vrstaStola == 'Okrugli') {
            let s = new Sto();
            s.r = this.precnikStola;
            s.stolicaO = this.brojStolicaOkrugli;
            s.vrsta = 'o';
            s.obeStraneS = this.isChecked;
            s.obeStraneD = this.isChecked1;
            this.stolovi.push(s);
            const canvas = this.renderer.createElement('canvas');
            this.renderer.setAttribute(canvas, 'width', '400');
            this.renderer.setAttribute(canvas, 'height', '200');
            // Dodajte <canvas> element u <div>
            this.renderer.appendChild(this.canvasDiv.nativeElement, canvas);
            // Dodajemo canvas element u niz kako bismo ga kasnije mogli ažurirati ili brisati
            this.stoloviCanvas.push(canvas);
            // Kreirajte dugme "Obriši" za brisanje stola
            const deleteButton = this.renderer.createElement('button');
            this.renderer.setProperty(deleteButton, 'textContent', 'Obriši');
            // Postavite stilove za centriranje dugmeta
            this.renderer.setStyle(deleteButton, 'display', 'block');
            this.renderer.setStyle(deleteButton, 'margin', '0 auto');
            this.renderer.addClass(deleteButton, 'stoClass'); // Zamijenajte 'my-custom-button-class' sa svojom željenom klasom
            this.renderer.listen(deleteButton, 'click', () => {
                // Implementirajte logiku za brisanje ovog stola i dugmeta
                this.obrisiSto(canvas, deleteButton);
            });
            // Ovde možete nastaviti sa radom na <canvas> elementu
            const context = canvas.getContext('2d');
            let ctx = context;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const tableRadius = precnikStola / 4;
            ctx.beginPath();
            ctx.arc(centerX, centerY, tableRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#e4519a'; // Boja stola
            ctx.fill();
            ctx.closePath();
            // Crtanje stolica (manji kružni oblici)
            const numChairs = brojStolicaOkrugli;
            const chairRadius = precnikStola / 20;
            const chairSpacing = (Math.PI * 2) / numChairs;
            for (let i = 0; i < numChairs; i++) {
                const angle = i * chairSpacing;
                const chairX = centerX + Math.cos(angle) * (tableRadius + 20); // 20 je razmak od stola
                const chairY = centerY + Math.sin(angle) * (tableRadius + 20);
                ctx.beginPath();
                ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#6bcb69'; // Boja stolice
                ctx.fill();
                ctx.closePath();
            }
            // Ispis broja (indeksa) u centru stola
            const index = this.stoloviCanvas.indexOf(canvas);
            const brojText = `${index + 1}`; // Dodajte 1 da biste brojali od 1, ne od 0
            const textMetrics = ctx.measureText(brojText);
            const textWidth = textMetrics.width;
            const textHeight = 20; // Visina teksta
            const textX = centerX - textWidth / 2; // X koordinata za centriranje
            const textY = centerY + textHeight / 2; // Y koordinata za centriranje
            ctx.font = '20px Arial';
            ctx.fillStyle = '#000'; // Boja teksta
            //ctx.fillText(brojText, textX, textY); // Postavite tekst u centar stola
            this.renderer.appendChild(this.canvasDiv.nativeElement, deleteButton);
        }
        if (vrstaStola == 'Pravougaoni') {
            let s1 = new Sto();
            s1.x = this.sirinaStola;
            s1.y = this.duzinaStola;
            s1.stolicaPduzina = this.brojStolicaPravougaoniDuzina;
            s1.stolicaPsirina = this.brojStolicaPravougaoniSirina;
            s1.obeStraneS = this.isChecked;
            s1.obeStraneD = this.isChecked1;
            s1.vrsta = 'p';
            this.stolovi.push(s1);
            const canvas = this.renderer.createElement('canvas');
            this.renderer.setAttribute(canvas, 'width', '400');
            this.renderer.setAttribute(canvas, 'height', '500');
            // Dodajte <canvas> element u <div>
            this.renderer.appendChild(this.canvasDiv.nativeElement, canvas);
            // Dodajemo canvas element u niz kako bismo ga kasnije mogli ažurirati ili brisati
            this.stoloviCanvas.push(canvas);
            // Kreirajte dugme "Obriši" za brisanje stola
            const deleteButton = this.renderer.createElement('button');
            this.renderer.setProperty(deleteButton, 'textContent', 'Obriši');
            // Postavite stilove za centriranje dugmeta
            this.renderer.setStyle(deleteButton, 'display', 'block');
            this.renderer.setStyle(deleteButton, 'margin', '0 auto');
            this.renderer.addClass(deleteButton, 'stoClass'); // Zamijenajte 'my-custom-button-class' sa svojom željenom klasom
            this.renderer.listen(deleteButton, 'click', () => {
                // Implementirajte logiku za brisanje ovog stola i dugmeta
                this.obrisiSto(canvas, deleteButton);
            });
            // Ovde možete nastaviti sa radom na <canvas> elementu
            const context = canvas.getContext('2d');
            let ctx = context;
            const tableWidth = parseInt(sirinaStola);
            const tableHeight = parseInt(duzinaStola);
            const tableX = canvas.width / 2 - tableWidth / 2;
            const tableY = canvas.height / 2 - tableHeight / 2;
            const chairRadius = 10;
            // Crtanje pravougaonog stola
            ctx.fillStyle = '#e4519a'; // Boja stola
            ctx.fillRect(tableX, tableY, tableWidth, tableHeight);
            // Broj stolica po redovima i kolonama
            const numChairsRows = this.brojStolicaPravougaoniSirina;
            const numChairsColumns = this.brojStolicaPravougaoniDuzina;
            // Raspored stolica duž vrha stola
            for (let i = 0; i < numChairsColumns; i++) {
                const chairX = tableX + 10 + (i * ((tableWidth - 20) / numChairsColumns)) + (tableWidth / numChairsColumns) / 2;
                const chairY = tableY - chairRadius - 10; // Postavite stolicu iznad stola
                // Crtanje stolice kao kruga
                ctx.beginPath();
                ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#6bcb69'; // Boja stolice
                ctx.fill();
                ctx.closePath();
            }
            // Raspored stolica duž donjeg dela stola
            for (let i = 0; (i < numChairsColumns) && this.isChecked; i++) {
                const chairX = tableX + 10 + (i * ((tableWidth - 20) / numChairsColumns)) + (tableWidth / numChairsColumns) / 2;
                const chairY = tableY + tableHeight + chairRadius + 10; // Postavite stolicu ispod stola
                // Crtanje stolice kao kruga
                ctx.beginPath();
                ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#6bcb69'; // Boja stolice
                ctx.fill();
                ctx.closePath();
            }
            // Raspored stolica duž leve strane stola
            for (let i = 0; i < numChairsRows; i++) {
                const chairX = tableX - chairRadius - 10; // Postavite stolicu levo od stola
                const chairY = tableY + 10 + (i * ((tableHeight - 20) / numChairsRows)) + (tableHeight / numChairsRows) / 2;
                // Crtanje stolice kao kruga
                ctx.beginPath();
                ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#6bcb69'; // Boja stolice
                ctx.fill();
                ctx.closePath();
            }
            // Raspored stolica duž desne strane stola
            for (let i = 0; (i < numChairsRows) && this.isChecked1; i++) {
                const chairX = tableX + tableWidth + chairRadius + 10; // Postavite stolicu desno od stola
                const chairY = tableY + 10 + (i * ((tableHeight - 20) / numChairsRows)) + (tableHeight / numChairsRows) / 2;
                // Crtanje stolice kao kruga
                ctx.beginPath();
                ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#6bcb69'; // Boja stolice
                ctx.fill();
                ctx.closePath();
            }
            this.renderer.appendChild(this.canvasDiv.nativeElement, deleteButton);
        }
    }
    obrisiSto(canvas, deleteButton) {
        // Implementirajte logiku za brisanje stola i dugmeta
        const index = this.stoloviCanvas.indexOf(canvas);
        if (index !== -1) {
            this.stoloviCanvas.splice(index, 1);
            this.renderer.removeChild(this.canvasDiv.nativeElement, canvas);
            this.renderer.removeChild(this.canvasDiv.nativeElement, deleteButton);
        }
    }
    vrstaChanged() {
        this.showAdditionalFields = this.vrsta === 'Restoran' || this.vrsta === 'Kafić';
    }
    potvrdi() {
        this.kIme = localStorage.getItem("korisnickoIme");
        if (!this.ime || !this.mesto || !this.telefon || !this.email || this.galerija.length == 0 || !this.tekst) {
            alert("Unesite sva polja.");
        }
        else {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(this.email)) {
                alert("Email adresa nije validna.");
                return;
            }
            const phoneRegex = /^\+\d{10}$/;
            if (!phoneRegex.test(this.telefon)) {
                alert("Broj telefona nije validan.");
                return;
            }
            this.servis.dodajUslugu(this.ime, this.mesto, this.telefon, this.email, this.galerija, this.vrsta, this.tekst, this.stolovi, this.kIme).subscribe(() => {
            });
            alert("Uspesno ste dodali uslugu.");
        }
    }
    ucitajSliku(event) {
        this.poruka = "";
        let dobra = true;
        let file = event.target.files[0];
        var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
        if (ext != "jpg") {
            dobra = false;
        }
        if (ext == "png") {
            dobra = true;
        }
        if (dobra) {
            this.convertToBase64(file);
            this.slikaDobra = true;
            this.poruka = "";
            this.imaUGaleriji = true;
        }
        else {
            this.poruka = "Slika mora biti JPG/PNG!";
            this.slikaDobra = false;
        }
    }
    ucitajGaleriju(event) {
        //this.galerija=[];
        if (event.target.files.length > 5) {
            alert("Ne moze vise od 5 slika!");
        }
        else {
            for (let i = 0; i < event.target.files.length; i++) {
                let dobra = true;
                let file = event.target.files[i];
                var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
                if (ext != "jpg") {
                    dobra = false;
                }
                if (ext == "png") {
                    dobra = true;
                }
                if (dobra) {
                    this.imaUGaleriji = true;
                    this.convertToBase64_Galerija(file);
                }
            }
        }
    }
    convertToBase64_Galerija(file) {
        let ob = new Observable((subscriber) => {
            this.readFile(file, subscriber);
        });
        ob.subscribe((slika) => {
            this.galerija.push(slika);
        });
    }
    convertToBase64(file) {
        let ob = new Observable((subscriber) => {
            this.readFile(file, subscriber);
        });
        ob.subscribe((slika) => {
            this.slika = slika;
        });
    }
    obrisiSlikuIzGalerije(g) {
        let indexToRemove = this.galerija.findIndex(function (element) {
            return element === g;
        });
        if (indexToRemove !== -1) {
            this.galerija.splice(indexToRemove, 1);
        }
        if (this.galerija.length == 0) {
            this.imaUGaleriji = false;
            const fileInput = this.elementRef.nativeElement.querySelector('#fileInput');
            if (fileInput) {
                fileInput.value = []; // Postavi vrednost inputa na prazan niz
            }
        }
    }
    readFile(file, subscriber) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            subscriber.next(reader.result);
            subscriber.complite();
        };
    }
    obrisiGaleriju() {
        this.galerija = [];
        this.imaUGaleriji = false;
        this.poruka = "";
        const fileInput = this.elementRef.nativeElement.querySelector('#fileInput');
        if (fileInput) {
            fileInput.value = []; // Postavi vrednost inputa na prazan niz
        }
    }
};
__decorate([
    ViewChild('canvasDiv', { static: false })
], UslugeComponent.prototype, "canvasDiv", void 0);
UslugeComponent = __decorate([
    Component({
        selector: 'app-usluge',
        templateUrl: './usluge.component.html',
        styleUrls: ['./usluge.component.css']
    })
], UslugeComponent);
export { UslugeComponent };
//# sourceMappingURL=usluge.component.js.map