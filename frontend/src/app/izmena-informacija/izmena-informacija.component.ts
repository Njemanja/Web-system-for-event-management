import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/users';
import { Usluge } from '../models/usluga';

@Component({
  selector: 'app-izmena-informacija',
  templateUrl: './izmena-informacija.component.html',
  styleUrls: ['./izmena-informacija.component.css']
})
export class IzmenaInformacijaComponent implements OnInit {

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
  constructor(private servis: UserService, private router: Router){}

  ngOnInit(): void {
    this.korisnickoIme=localStorage.getItem("korisnickoIme");
    this.servis.dohvatiKorisnika(this.korisnickoIme).subscribe((user: User)=>{
      this.ime=user.ime;
      this.prezime=user.prezime;
      this.email=user.email;
      this.telefon=user.telefon;
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
      localStorage.setItem("korisnickoIme", this.korisnickoIme)
      this.servis.izmeniInformacije(this.korisnickoIme, this.lozinka, this.ime, this.prezime, this.datum, this.telefon, this.email,this.status).subscribe((resp)=>{
        if(resp['poruka']=='1'){
          this.poruka="";
          alert("Uspesno ste se izmenili informacije!")
        
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
}
