import { Component, OnInit } from '@angular/core';
import { Osoba } from '../models/osoba';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Usluge } from '../models/usluga';

@Component({
  selector: 'app-pozivnica',
  templateUrl: './pozivnica.component.html',
  styleUrls: ['./pozivnica.component.css']
})
export class PozivnicaComponent implements OnInit {
  constructor(private servis: UserService, private router: Router){}

  datum: Date;
  tekst: string;
  mesto: string;
  osoba: string;
  email: string;
  naziv: string;
  sveOsobe: Osoba[] = [];
  potvrdaVreme: Date;
  idMesta: number;
  korisnickoIme: string;
  sveUsluge: Usluge[]=[];
  ngOnInit(): void {
    if( localStorage.getItem("status")!="Korisnik"){
      this.router.navigate(['']);
    }
    this.korisnickoIme=localStorage.getItem("korisnickoIme");
    this.servis.dohvatiSveUsluge().subscribe((data: Usluge[])=>{
      this.sveUsluge=data;
    })
  }
  poruka: string;
  potvrdi() {
    if(!this.datum || !this.mesto || !this.tekst || !this.datum || !this.naziv || !this.ulica || !this.potvrdaVreme){
      this.poruka="Morate uneti sva polja!";
      return;
    }
    const danas = new Date();
    if (this.datum < danas) {
      this.poruka="Datum proslave mora biti u budućnosti.";
      return;
    }
    this.servis.napraviDogadjaj(this.naziv, this.mesto, this.datum, 
      this.potvrdaVreme, this.tekst, this.sveOsobe, this.hrana, this.pice, this.ostalo,
      this.pokloni, this.ulica, this.korisnickoIme, this.idMesta).subscribe(()=>{
      
    })
    alert("Uspesno ste napravili dogadjaj!");
  }

  dodajOsobu() {
    var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if(!emailRegex.test(this.email)){
      this.poruka="Email nije u odgovarajucem obliku."
      return;
    }
    if (this.osoba && this.email) {
      const novaOsoba = new Osoba();
      novaOsoba.ime = this.osoba;
      novaOsoba.email = this.email;
      this.sveOsobe.push(novaOsoba);
      this.osoba = '';
      this.email = '';
    }
  
  }

  obrisiOsobu(index: number) {
    if (index >= 0 && index < this.sveOsobe.length) {
      this.sveOsobe.splice(index, 1);
    }
  }
  obrisiPoklon(index: number) {
    if (index >= 0 && index < this.pokloni.length) {
      this.pokloni.splice(index, 1);
    }
  }


o: string;
h: string;
p: string;
hrana: string[] = [];
pice: string[] = [];
ostalo: string[] = [];
pokloni: string[] = [];
poklon: string;
ulica: string;
dodajHranu() {
    if (this.h) {
        this.hrana.push(this.h);
        this.h = '';
    }
}

dodajPice() {
    if (this.p) {
        this.pice.push(this.p);
        this.p = '';
    }
}
dodajPoklone() {
  if (this.poklon) {
      this.pokloni.push(this.poklon);
      this.poklon = '';
  }
}

dodajOstalo() {
    if (this.o) {
        this.ostalo.push(this.o);
        this.o = '';
    }
}

obrisiHranu(index: number) {
    if (index >= 0 && index < this.hrana.length) {
        this.hrana.splice(index, 1);
    }
}

obrisiPice(index: number) {
    if (index >= 0 && index < this.pice.length) {
        this.pice.splice(index, 1);
    }
}

obrisiOstalo(index: number) {
    if (index >= 0 && index < this.ostalo.length) {
        this.ostalo.splice(index, 1);
    }
}
}
