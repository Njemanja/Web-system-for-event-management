import { Component, OnInit } from '@angular/core';
import { Kalendar } from '../models/kalendar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { KalendarCeo } from '../models/kalendarCeo';
import { saveAs } from 'file-saver';
import { AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-kalendar',
  templateUrl: './kalendar.component.html',
  styleUrls: ['./kalendar.component.css']
})
export class KalendarComponent implements OnInit {

  items: Kalendar[]=[]; 
  displayedItems: Kalendar[] = []; 
  itemsPerPage = 5; 
  currentPage = 1; 
  ukupno: number = 0;
  constructor(private servis: UserService, private router: Router){}
  korisnickoIme: string;
  ngOnInit() {
      if(localStorage.getItem("status")!="Usluge"){
        this.router.navigate(['/login']);
      }
      this.korisnickoIme= localStorage.getItem("korisnickoIme");
      this.servis.dohvatiKalendar(this.korisnickoIme).subscribe((kalendar: KalendarCeo)=>{
        this.items=kalendar.niz
        if(this.items==null){
          this.items=[];
        }
        this.loadMore()
        this.zadaradjeno();
        this.s();
        this.s1();
      })
      this.loadMore(); 
  }
  izvestaj() {
    const izvestaj = this.generateReport(); 
    const blob = new Blob([izvestaj], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'izvestajONovcu.txt');
  }
  

  public chart: any;

  
  

  s() {
    const groupedData: { [key: string]: number } = {};
    this.items.forEach((proslava: Kalendar) => {
      const datum = new Date(proslava.datum);
      const mesecGodina = `${datum.getMonth() + 1}-${datum.getFullYear()}`;
      if (!groupedData[mesecGodina]) {
        groupedData[mesecGodina] = 0;
      }
      groupedData[mesecGodina] += 1 * proslava.novac;
    });
  
    // Dobijamo referencu na canvas element
    const canvas = <HTMLCanvasElement>document.getElementById('grafikon');
    const ctx = canvas.getContext('2d');
  
    ctx.fillStyle = '#e4519a'; 
    
    ctx.font = '16px Arial'; // Manji font za ključeve
    
    const maxVrednost = Math.max(...Object.values(groupedData));
    
    const keys = Object.keys(groupedData);
    for (let i = 0; i < keys.length; i++) {
      const mesecGodina = keys[i];
      const visina = (groupedData[mesecGodina] / maxVrednost) * (canvas.height - 70); // Skaliramo visinu stuba
      const x = i * 100; // Povećana udaljenost između stubova
      const y = canvas.height - visina - 40; 
    
      ctx.fillStyle = 'black'; // Crna boja za ključeve
      ctx.fillText(mesecGodina, x , canvas.height - 10); // Pomereno za 30px udesno
    
      ctx.fillStyle = 'black'; // Crna boja za vrednosti
      ctx.fillText(groupedData[mesecGodina].toString(), x , y - 10); // Pomereno za 30px udesno
    
      ctx.fillStyle = '#e4519a'; // Plava boja za grafikon
      ctx.fillRect(x, y, 40, visina);
    }
  }
  
  
  
  s1() {
    const groupedData: { [key: string]: number } = {};
    this.items.forEach((proslava: Kalendar) => {
      const datum = new Date(proslava.datum);
      const godina = datum.getFullYear().toString();
      if (!groupedData[godina]) {
        groupedData[godina] = 0;
      }
      groupedData[godina] += 1 * proslava.novac;
    });
  
    // Dobijamo referencu na canvas element
    const canvas = <HTMLCanvasElement>document.getElementById('grafikon1');
    const ctx = canvas.getContext('2d');
  
    ctx.fillStyle = '#e4519a'; 
  
    ctx.font = '16px Arial';
    
    const maxVrednost = Math.max(...Object.values(groupedData));
    
    const keys = Object.keys(groupedData);
    for (let i = 0; i < keys.length; i++) {
      const mesecGodina = keys[i];
      const visina = (groupedData[mesecGodina] / maxVrednost) * (canvas.height - 70); // Skaliramo visinu stuba
      const x = i * 80; 
      const y = canvas.height - visina - 40; 
  
      ctx.fillStyle = 'black'; // Crna boja za ključeve
      ctx.fillText(mesecGodina, x , canvas.height - 10);
  
      ctx.fillStyle = 'black'; // Crna boja za vrednosti
      ctx.fillText(groupedData[mesecGodina].toString(), x , y - 10);
  
      ctx.fillStyle = '#e4519a'; // Plava boja za grafikon
      ctx.fillRect(x, y, 40, visina);
    }
  }
















  generateReport(): string {
    const groupedData: { [key: string]: number } = {};
    this.items.forEach((proslava: Kalendar) => {
      const datum = new Date(proslava.datum);
      const mesecGodina = `${datum.getMonth() + 1}-${datum.getFullYear()}`;
      if (!groupedData[mesecGodina]) {
        groupedData[mesecGodina] = 0;
      }
      groupedData[mesecGodina] += 1*proslava.novac;
    });
  
    let izvestaj = 'Izvestaj o prihodima po mesecima i godinama:\n\n';
    for (const kljuc in groupedData) {
      if (groupedData.hasOwnProperty(kljuc)) {
        const mesecGodina = kljuc;
        const suma = groupedData[kljuc];
        izvestaj += `${mesecGodina}: ${suma} eura\n`; 
      }
    }
  
    return izvestaj;
  }

  izvestajY() {
    const izvestaj = this.generateReportByYear(); 
    const blob = new Blob([izvestaj], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'izvestajONovcuPoGodini.txt');
  }

  generateReportByYear(): string {
   
    const groupedData: { [key: string]: number } = {};
    this.items.forEach((proslava: Kalendar) => {
      const datum = new Date(proslava.datum);
      const godina = datum.getFullYear().toString();
      if (!groupedData[godina]) {
        groupedData[godina] = 0;
      }
      groupedData[godina] += 1 * proslava.novac;
    });
  
    let izvestaj = 'Izvestaj o prihodima po godinama:\n\n';
    for (const kljuc in groupedData) {
      if (groupedData.hasOwnProperty(kljuc)) {
        const godina = kljuc;
        const suma = groupedData[kljuc];
        izvestaj += `${godina}: ${suma} eura\n`; 
      }
    }
  
    return izvestaj;
  }
  
  
  
  loadMore() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      
      const endIndex = startIndex + this.itemsPerPage;
      if (startIndex < this.items.length) {
          const nextItems = this.items.slice(startIndex, endIndex);
          this.displayedItems = [...this.displayedItems, ...nextItems];
          this.currentPage++;
      }
  }

  obrisiRed(index: number) {
    if (index >= 0 && index < this.displayedItems.length) {
      const deletedItem = this.displayedItems.splice(index, 1)[0]; 
      const itemIndex = this.items.findIndex(item => item === deletedItem);
        if (itemIndex !== -1) {
            this.items.splice(itemIndex, 1);
        }
      this.zadaradjeno();
      this.dodajUBazu();
    }
  }
  dodajUBazu(){
    this.servis.dodajKalendar(this.items, this.korisnickoIme).subscribe(()=>{
      
    })
  }

  datum: Date;
  mesto: string;
  novac: number;
  pozivalac: string;
  telefon: string;
  email: string;
  dodajRed() {
     let k = new Kalendar();
     k.datum=this.datum;
     k.mesto=this.mesto;
     k.email=this.email;
     k.novac=this.novac;
     k.telefon=this.telefon;
     k.pozivalac=this.pozivalac;
     this.items.push(k);
     this.displayedItems.unshift(k);
     this.zadaradjeno();
     this.dodajUBazu();
  }




  sortirajPoDatumu() {
    this.displayedItems.sort((a, b) => {
      return new Date(a.datum).getTime() - new Date(b.datum).getTime();
    });
  }

  sortirajPoNovcu() {
    this.displayedItems.sort((a, b) => {
      return a.novac - b.novac;
    });
  }

  obrnutoSortirajPoDatumu() {
    this.displayedItems.sort((a, b) => {
      return new Date(b.datum).getTime() - new Date(a.datum).getTime();
    });
  }

  obrnutoSortirajPoNovcu() {
    this.displayedItems.sort((a, b) => {
      return b.novac - a.novac;
    });
  }

  prosleProslave: Kalendar[] = [];
  zadaradjeno(){
    const trenutniDatum = new Date();
    this.prosleProslave = this.items.filter((proslava: any) => {
    const proslavaDatum = new Date(proslava.datum);
    return proslavaDatum < trenutniDatum;
  });
  let u = 0;
  this.prosleProslave.forEach((proslava: any) => {
    if(proslava){
      u += parseFloat(proslava.novac);
    }
   
  });
  this.ukupno=u;


  }

}
