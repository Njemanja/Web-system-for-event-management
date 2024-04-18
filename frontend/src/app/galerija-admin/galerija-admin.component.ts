import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galerija-admin',
  templateUrl: './galerija-admin.component.html',
  styleUrls: ['./galerija-admin.component.css']
})
export class GalerijaAdminComponent implements OnInit {

  constructor( private router: Router) { }
  galerija: string[]=[];
  ngOnInit(): void {
    if( localStorage.getItem("korisnickoIme")!="Admin"){
      this.router.navigate(['']);
    }
    this.galerija = JSON.parse(localStorage.getItem("galerija"));
  }

}
