import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Usluge } from '../models/usluga';
@Component({
  selector: 'app-ponuda-informacije',
  templateUrl: './ponuda-informacije.component.html',
  styleUrls: ['./ponuda-informacije.component.css']
})
export class PonudaInformacijeComponent implements OnInit {

  constructor(private servis: UserService, private router: Router){}
  vrsta: string;
  usluge: Usluge[]=[];
  filter: Usluge[]=[];

  ngOnInit(): void {
    if(localStorage.getItem("status")!="Korisnik"){
      this.router.navigate(['']);
    }
    this.vrsta = localStorage.getItem("vrsta");
    this.servis.dohvatiSveUsluge().subscribe((usl: Usluge[]) => {
      this.usluge = usl;
      for (let i = 0; i < usl.length; i++) {
        if (
          this.usluge[i].vrsta === this.vrsta ||
          (this.vrsta === "prostor" &&
            ["kafic", "Restoran", "Klub", "Bar", "Splav", "Brod", "Kafić"].includes(
              this.usluge[i].vrsta
            ))
        ) {
          this.filter.push(this.usluge[i]);
        }
      }
    });
  }
  
  ponuda(p){
    localStorage.setItem("infoPonuda", JSON.stringify(p));
  }
  

}
