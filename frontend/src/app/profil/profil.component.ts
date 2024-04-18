import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/users';
import { Usluge } from '../models/usluga';
import { MojDogadjaj } from '../models/mojDogadjaj';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  constructor(private servis: UserService, private router: Router){}
  ime: string;
  prezime:string;
  lozinka: string;
  lozinka2: string;
  datum: Date;
  telefon: string;
  korisnickoIme: string;
  email: string;
  poruka: string;
  status: string;
  mojeUsluge: Usluge[]=[];
  mojiDogajdjaji: MojDogadjaj[]=[];
  ngOnInit(): void {
    if( localStorage.getItem("status")!="Korisnik"){
      this.router.navigate(['']);
    }

    this.korisnickoIme=localStorage.getItem("korisnickoIme");
    this.servis.dohvatiKorisnika(this.korisnickoIme).subscribe((user: User)=>{
      this.ime=user.ime;
      this.prezime=user.prezime;
      this.email=user.email;
      this.telefon=user.telefon;
    })
    this.servis.mojiDogjadjaji(this.korisnickoIme).subscribe((dogadjaji: MojDogadjaj[])=>{
        this.mojiDogajdjaji=dogadjaji;
    })
  }
  izmeni(){
   


    if (
      this.korisnickoIme &&
      this.lozinka &&
      this.lozinka.length >= 8 &&
      this.lozinka === this.lozinka2 &&
      this.ime &&
      this.prezime &&
      this.telefon &&
      this.email &&
      this.email.includes('@') 
    ) {
      this.servis.izmeniInformacije(this.korisnickoIme, this.lozinka, this.ime, this.prezime, this.datum, this.telefon, this.email,this.status).subscribe((resp)=>{
        if(resp['poruka']=='1'){
          this.poruka="";
          alert("Uspesno ste se izmenili informacije!")
          localStorage.setItem("korisnickoIme", this.korisnickoIme)
          this.router.navigate(['/usluge/profil/informacije']);

        }
        else if(resp['poruka']=='2'){
          this.poruka="Korisnik sa datim email-om ili korisnickim imenom vec postoji!"
        }
        else{
          this.poruka="Niste uneli ispravne podatke!"
        }
     })
    } else {
      this.poruka="Podaci nisu ispravni.\n Lozinka treba sadrzati najmanje 8 karaktera. \n Morate biti punoletni. "
    }
  }
  
  qrData: string = 'https://www.google.com/';
  qrCode: string = '';

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
  
  sacuvajDogadjaj(dogadjaj: MojDogadjaj) {
    localStorage.setItem('sacuvanDogadjaj', JSON.stringify(dogadjaj));

  }
  



}
