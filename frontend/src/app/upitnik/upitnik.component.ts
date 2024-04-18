import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MojDogadjaj } from '../models/mojDogadjaj';
import * as L from 'leaflet';
import { UserService } from '../user.service';

@Component({
  selector: 'app-upitnik',
  templateUrl: './upitnik.component.html',
  styleUrls: ['./upitnik.component.css']
})
export class UpitnikComponent implements OnInit {
  private map;
  x: any = 0;
  y: any = 0;
  s: boolean;
  jsonData: MojDogadjaj;
  hrana: string[]=[];
  pice: string[]=[];
  ostalo: string[]=[];
  zelje: string[]=[];
  kome: string;

  constructor( private servis: UserService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let currentRoute = this.route.snapshot.url.join('/'); 
    currentRoute = currentRoute.substring(8);
    const decodedData = decodeURIComponent(currentRoute);
    const jsonData = JSON.parse(decodedData);
    this.kome=jsonData.kome;
    this.jsonData = jsonData.dogadjaj;
    let grad = ""+this.jsonData.ulica; 

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
  
  toggleHrana(item: string) {
    const index = this.hrana.indexOf(item);
    if (index !== -1) {
      this.hrana.splice(index, 1); // Uklonite stavku iz liste ako postoji
    } else {
      this.hrana.push(item); // Dodajte stavku u listu ako ne postoji
    }
  }

  toggleOstalo(item: string) {
    const index = this.hrana.indexOf(item);
    if (index !== -1) {
      this.ostalo.splice(index, 1); // Uklonite stavku iz liste ako postoji
    } else {
      this.ostalo.push(item); // Dodajte stavku u listu ako ne postoji
    }
  }

  togglePice(item: string) {
    const index = this.pice.indexOf(item);
    if (index !== -1) {
      this.pice.splice(index, 1); // Uklonite stavku iz liste ako postoji
    } else {
      this.pice.push(item); // Dodajte stavku u listu ako ne postoji
    }
  }

  toggleZelje(item: string) {
    const index = this.zelje.indexOf(item);
    if (index !== -1) {
      this.zelje.splice(index, 1); // Uklonite stavku iz liste ako postoji
    } else {
      this.zelje.push(item); // Dodajte stavku u listu ako ne postoji
    }
  }

  potvrdi(){
    this.servis.dolazim(this.hrana,this.pice, this.zelje, this.ostalo, this.kome, this.jsonData.id).subscribe((data)=>{
       alert("Potvrdili ste dolazak. Rezervisali ste kupovinu: "+data)
    })
  }
  
}
