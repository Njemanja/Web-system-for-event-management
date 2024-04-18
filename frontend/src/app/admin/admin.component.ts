import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Usluge } from '../models/usluga';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private servis: AdminService, private router: Router, private renderer: Renderer2) { }
  us: Usluge[] = [];
  trenutnaSlikaIndex: number[] = [];
  
  ngOnInit(): void {
    if( localStorage.getItem("korisnickoIme")!="Admin"){
      this.router.navigate(['/login']);
    }
    this.servis.dohvatiUsluge().subscribe((usluge: Usluge[]) => {
      this.us = usluge;
      this.trenutnaSlikaIndex = usluge.map(() => 0);
    });
  }

  galerija(g) {
    const galerijaJSON = JSON.stringify(g);
    localStorage.setItem("galerija", galerijaJSON);
  }
  
  potvrdi(id){
    this.servis.potvrdi(id).subscribe((usl: Usluge) => {
     if(usl){
      location.reload();

     }
    });
  }

  
 odjava(){
  localStorage.setItem("korisnickoIme", "");
  localStorage.setItem("status", "");
  this.router.navigate(['/login']);
}

  
}
