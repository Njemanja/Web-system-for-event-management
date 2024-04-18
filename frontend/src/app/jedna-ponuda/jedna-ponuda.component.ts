import { Component, OnInit } from '@angular/core';
import { Usluge } from '../models/usluga';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jedna-ponuda',
  templateUrl: './jedna-ponuda.component.html',
  styleUrls: ['./jedna-ponuda.component.css']
})
export class JednaPonudaComponent implements OnInit {
  constructor( private router: Router) { }

  ponuda: Usluge;
  trenutnaSlikaIndex: number = 0;
  ukupanBrojStolica: number = 0;
  private map;
  x: any = 0;
  y: any = 0;
  s: boolean;
  ngOnInit(): void {
    if(localStorage.getItem("status")!="Korisnik"){
      this.router.navigate(['']);
    }
    const ponudaString = localStorage.getItem("infoPonuda");
    if(localStorage.getItem("vrsta")=="prostor"){
      this.s=true;
    }else{
      this.s=false;
    }

    if (ponudaString) {
      this.ponuda = JSON.parse(ponudaString);
      this.ukupanBrojStolica = this.izracunajUkupanBrojStolica(this.ponuda.stolovi);
    }
    let grad = ""+this.ponuda.mesto; 

    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(this.map);
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + grad)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lat = parseFloat(data[0].lat);
                var lon = parseFloat(data[0].lon);
                L.marker([lat, lon]).addTo(this.map)
                    .bindPopup('' + grad)
                    .openPopup();
                    this.map.setView([lat, lon], 8);
            } 
        })
        .catch(error => {
            console.error('Greška pri pretrazi grada:', error);
        });
  }

  sledecaSlika() {
    if (this.ponuda && this.ponuda.galerija && this.ponuda.galerija.length > 0) {
      this.trenutnaSlikaIndex = (this.trenutnaSlikaIndex + 1) % this.ponuda.galerija.length;
    }
  }

  izracunajUkupanBrojStolica(stolovi) {
    let ukupanBroj = 0;
    for (const sto of stolovi) {
      if (sto.vrsta == 'o') {
        ukupanBroj += sto.stolicaO;
      }
      if (sto.vrsta == 'p') {
        ukupanBroj += sto.stolicaPduzina;
        if (sto.obeStraneD) {
          ukupanBroj += sto.stolicaPduzina;
        }
        ukupanBroj += sto.stolicaPsirina;
        if (sto.obeStraneS) {
          ukupanBroj += sto.stolicaPsirina;
        }
      }
    }
    return ukupanBroj;
  }
}
