import { Component, OnInit } from '@angular/core';
import { MojDogadjaj } from '../models/mojDogadjaj';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Gosti } from '../models/gosti';

@Component({
  selector: 'app-proslava-informacija',
  templateUrl: './proslava-informacija.component.html',
  styleUrls: ['./proslava-informacija.component.css']
})
export class ProslavaInformacijaComponent implements OnInit {
  sacuvanDogadjaj: MojDogadjaj; 

  constructor(private servis: UserService, private router: Router){}
  id: number;
  ngOnInit(): void {
    if( localStorage.getItem("status")!="Korisnik"){
      this.router.navigate(['']);
    }

    const sacuvaniDogadjaj = localStorage.getItem('sacuvanDogadjaj');
    if (sacuvaniDogadjaj) {
      this.sacuvanDogadjaj = JSON.parse(sacuvaniDogadjaj);
    }
    this.servis.gosti(this.sacuvanDogadjaj.id).subscribe((gosti: Gosti[]) => {
      this.gosti=gosti;

    })
  }

  posaljiPozivnicu() {
    const QRCode = require('qrcode-generator');
    const qr = QRCode(0, 'M');
    qr.make();
    const moduleSize = 8;
    const qrSize = qr.getModuleCount() * moduleSize;
    for(let i=0;i <this.sacuvanDogadjaj.osobe.length;i++){
      const jsonData = { dogadjaj: this.sacuvanDogadjaj, kome: this.sacuvanDogadjaj.osobe[i].ime};
      const encodedData = encodeURIComponent(JSON.stringify(jsonData));
      const url = `http://localhost:4200/upitnik/${encodedData}`;
      let linkZaUpitnik = url;
      let qrZaUpitnik = this.generateQRCodeDataUrl(url);


      const qrDownloadLink = document.createElement('a');
      qrDownloadLink.href = qrZaUpitnik;
      qrDownloadLink.download = ""+this.sacuvanDogadjaj.osobe[i].ime+"_pozivnica.png"; 
      qrDownloadLink.style.display = 'none';
      document.body.appendChild(qrDownloadLink);  
      qrDownloadLink.click();  
      document.body.removeChild(qrDownloadLink);

      const url1 = "http://localhost:4200/raspored/"+this.sacuvanDogadjaj.id;
      alert(url1);
      this.servis.posaljiPozivnicu(this.sacuvanDogadjaj, linkZaUpitnik, qrZaUpitnik, this.sacuvanDogadjaj.osobe[i].email,url1).subscribe(() => {
      
      });
    }
    alert("Poslali ste pozivnicu!");
  }

  osobaJeUListi(osoba): boolean {
    return this.gosti.some(gost => gost.ime === osoba.ime);
  }

  
  generateTxtContent(gosti: Gosti[]): string {
    const txtLines = gosti.map((gost) => gost.ime);
    return txtLines.join('\n');
  }
  spisak(){
    this.servis.gosti(this.sacuvanDogadjaj.id).subscribe((gosti: Gosti[]) => {
      const txtContent = this.generateTxtContent(gosti);
      const blob = new Blob([txtContent], { type: 'text/plain' });
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'spisak.txt';
      link.click();
      window.URL.revokeObjectURL(blobUrl);
    });
  }
  
  generateQRCodeDataUrl(data: string): string {
    const QRCode = require('qrcode-generator');
    const qr = QRCode(0, 'M');
    qr.addData(data);
    qr.make();
    const moduleSize = 8;
    const qrSize = qr.getModuleCount() * moduleSize;
  
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = qrSize;
  
    for (let row = 0; row < qr.getModuleCount(); row++) {
      for (let col = 0; col < qr.getModuleCount(); col++) {
        context.fillStyle = qr.isDark(row, col) ? 'black' : 'white';
        context.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
      }
    }
  
    return canvas.toDataURL('image/png');
  }

  
  izvestaj: any = {}; 
  gosti: Gosti[] = []; 

  generisiIzvestaj() {
    this.izvestaj.ukupanBrojGostiju = this.gosti.length;
    this.izvestaj.hrana = {};
    this.izvestaj.pice = {};
    this.izvestaj.ostalo = {};
    this.gosti.forEach((gost) => {
      if (gost.hrana) {
        gost.hrana.forEach((hrana) => {
          this.izvestaj.hrana[hrana] =
            (this.izvestaj.hrana[hrana] || 0) + 1;
        });
      }

      if (gost.pice) {
        gost.pice.forEach((pice) => {
          this.izvestaj.pice[pice] = (this.izvestaj.pice[pice] || 0) + 1;
        });
      }

      if (gost.ostalo) {
        gost.ostalo.forEach((ostalo) => {
          this.izvestaj.ostalo[ostalo] =
            (this.izvestaj.ostalo[ostalo] || 0) + 1;
        });
      }
    });

        const izvestajTekst = `
        Ukupan broj gostiju: ${this.izvestaj.ukupanBrojGostiju}
        ----------------------------------
        HRANA
        ${this.formatirajObjekat(this.izvestaj.hrana)}
        ----------------------------------
        PICE
        ${this.formatirajObjekat(this.izvestaj.pice)}
        ----------------------------------
        OSTALO
        ${this.formatirajObjekat(this.izvestaj.ostalo)}
      `;
      const blob = new Blob([izvestajTekst], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'izvestajOGostima.txt'; 
      a.click();
      window.URL.revokeObjectURL(url);
  }
  formatirajObjekat(objekat: any): string {
    return Object.keys(objekat)
      .map((kljuc) => `${kljuc}: ${objekat[kljuc]}`)
      .join('\n');
  }


  raspored(){
    if( localStorage.getItem("status")!="Korisnik"){
      this.router.navigate(['']);
    }
    localStorage.setItem("idMesta", ""+this.sacuvanDogadjaj.idMesta);
    localStorage.setItem("idDogadjaja", this.sacuvanDogadjaj.id+"");
    this.router.navigate(['raspored']);
  }
  
}
