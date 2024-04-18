import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


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
  constructor(private servis: UserService, private router: Router){}

  ngOnInit(): void {
  }

  register(){

    const datumRodjenja = new Date(this.datum);
    const danas = new Date();
    const razlikaGodina = danas.getFullYear() - datumRodjenja.getFullYear();

    if (
      this.korisnickoIme &&
      this.lozinka &&
      this.lozinka.length >= 8 &&
      this.lozinka === this.lozinka2 &&
      this.ime &&
      this.prezime &&
      this.datum &&
      this.telefon &&
      this.status &&
      this.email &&
      this.email.includes('@') &&
      razlikaGodina >= 18
    ) {
      this.servis.register(this.korisnickoIme, this.lozinka, this.ime, this.prezime, this.datum, this.telefon, this.email,this.status).subscribe((resp)=>{
        if(resp['poruka']=='1'){
          this.poruka="";
          alert("Uspesno ste se registrovali!")
          this.router.navigate(['/login']);

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

  login(){
    this.router.navigate(['/login']);

  }

}
