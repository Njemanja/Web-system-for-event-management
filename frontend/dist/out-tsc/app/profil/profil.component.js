import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProfilComponent = class ProfilComponent {
    constructor(servis, router) {
        this.servis = servis;
        this.router = router;
        this.qrData = 'https://www.google.com/';
        this.qrCode = '';
    }
    ngOnInit() {
        this.generateQRCode();
    }
    generateQRCode() {
        const QRCode = require('qrcode-generator');
        const qr = QRCode(0, 'M');
        //qr.addData(this.qrData);
        qr.make();
        // Odredite veličinu kvadrata za svaki modul QR koda
        const moduleSize = 8; // Povećajte veličinu po potrebi
        const qrSize = qr.getModuleCount() * moduleSize;
        const jsonData = { name: "John", age: 30 };
        const encodedData = encodeURIComponent(JSON.stringify(jsonData));
        const url = `http://localhost:4200/upitnik/${encodedData}`;
        // Stvorite canvas element za crtanje QR koda
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        // Postavite veličinu canvasa na temelju QR koda
        canvas.width = canvas.height = qrSize;
        // Crtajte QR kod na canvasu
        for (let row = 0; row < qr.getModuleCount(); row++) {
            for (let col = 0; col < qr.getModuleCount(); col++) {
                context.fillStyle = qr.isDark(row, col) ? 'black' : 'white';
                context.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
            }
        }
        // Pretvorite canvas u sliku u PNG formatu
        canvas.toBlob((blob) => {
            // Spremite blob kao PNG datoteku
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'qrcode.png'; // Naziv datoteke
            link.click();
        }, 'image/png');
    }
};
ProfilComponent = __decorate([
    Component({
        selector: 'app-profil',
        templateUrl: './profil.component.html',
        styleUrls: ['./profil.component.css']
    })
], ProfilComponent);
export { ProfilComponent };
//# sourceMappingURL=profil.component.js.map