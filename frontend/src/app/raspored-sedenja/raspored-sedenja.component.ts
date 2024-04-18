import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Sto } from '../models/sto';
import { Usluge } from '../models/usluga';
import { saveAs } from 'file-saver';
import { Raspored } from '../models/raspored';
@Component({
  selector: 'app-raspored-sedenja',
  templateUrl: './raspored-sedenja.component.html',
  styleUrls: ['./raspored-sedenja.component.css']
})
export class RasporedSedenjaComponent implements OnInit {
  @ViewChild('canvasDiv', { static: false }) canvasDiv: ElementRef;
  private context: CanvasRenderingContext2D;
  private stoloviCanvas: HTMLCanvasElement[] = [];
  idMesta: number;
  idDogadjaja: number;
  usluga: Usluge;
  constructor(private elementRef: ElementRef,private renderer: Renderer2, private servis: UserService, private router: Router) {}  

  ngOnInit(): void {
    if( localStorage.getItem("status")!="Korisnik"){
      this.router.navigate(['']);
    }
    this.idMesta=parseInt(localStorage.getItem("idMesta"));
    this.idDogadjaja=parseInt(localStorage.getItem("idDogadjaja"));

    this.servis.dohvatiRaspored(this.idDogadjaja).subscribe((rasp: any) => {
      const rasporedArray = rasp.raspored; 
    
      rasporedArray.forEach((rasporedItem: any) => {
       
        let r = new Raspored();
        r.ime = rasporedItem.ime;
        r.sto = rasporedItem.sto;
        this.raspored.push(r);
      });
      this.raspored.sort((a, b) => a.sto - b.sto);

    });

    this.servis.dohvatiUslugu( this.idMesta).subscribe((usluga: Usluge) => { 
      this.usluga=usluga;
      for(let i=0;i<this.usluga.stolovi.length;i++){
        this.ispisiStolove(this.usluga.stolovi[i]);
      }
    })  
  }




  ispisiStolove(s: Sto) {
      
      
    
     
    if (s.vrsta == 'o') {
     

      const canvas = this.renderer.createElement('canvas');
      this.renderer.setAttribute(canvas, 'width', '400');
      this.renderer.setAttribute(canvas, 'height', '200');
    
      this.renderer.appendChild(this.canvasDiv.nativeElement, canvas);
      this.stoloviCanvas.push(canvas);
      canvas.addEventListener('click', () => {
        this.izabranSto(index); // Pozovite funkciju izabranSto() sa indeksom stola
      });
     
     
      const context = canvas.getContext('2d');
      let ctx = context;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const tableRadius = s.r/4;
  
      ctx.beginPath();
      ctx.arc(centerX, centerY, tableRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#e4519a';
      ctx.fill();
      ctx.closePath();
  
      const numChairs = s.stolicaO;
      const chairRadius = s.r/20;
      const chairSpacing = (Math.PI * 2) / numChairs;
  
      for (let i = 0; i < numChairs; i++) {
        const angle = i * chairSpacing;
        const chairX = centerX + Math.cos(angle) * (tableRadius + 20); 
        const chairY = centerY + Math.sin(angle) * (tableRadius + 20);
  
        ctx.beginPath();
        ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#6bcb69';
        ctx.fill();
        ctx.closePath();
      }
  
     
      const index = this.stoloviCanvas.indexOf(canvas);
      const brojText = `${index + 1}`;
      const textMetrics = ctx.measureText(brojText);
      const textWidth = textMetrics.width;
      const textHeight = 20; 
  
      const textX = centerX - textWidth / 2; 
      const textY = centerY + textHeight / 2; 
  
      ctx.font = '20px Arial';
      ctx.fillStyle = '#000'; 
      ctx.fillText(brojText, textX, textY);

     
    }
    if (s.vrsta == 'p') {
      
     
      const canvas = this.renderer.createElement('canvas');
      this.renderer.setAttribute(canvas, 'width', '400');
      this.renderer.setAttribute(canvas, 'height', '500');
      this.renderer.appendChild(this.canvasDiv.nativeElement, canvas);
      this.stoloviCanvas.push(canvas);
      canvas.addEventListener('click', () => {
        this.izabranSto(index); // Pozovite funkciju izabranSto() sa indeksom stola
      });
     
      // Ovde možete nastaviti sa radom na <canvas> elementu
      const context = canvas.getContext('2d');
      let ctx = context;
      const tableWidth = s.x;
      const tableHeight = s.y;
      const tableX = canvas.width / 2 - tableWidth / 2;
      const tableY = canvas.height / 2 - tableHeight / 2;
      const chairRadius = 10;
  
      // Crtanje pravougaonog stola
      ctx.fillStyle = '#e4519a'; // Boja stola
      ctx.fillRect(tableX, tableY, tableWidth, tableHeight);
  
      // Broj stolica po redovima i kolonama
      const numChairsRows = s.stolicaPduzina;
      const numChairsColumns = s.stolicaPsirina;
  
      // Raspored stolica duž vrha stola
      for (let i = 0; i < numChairsColumns ; i++) {
          const chairX = tableX + 10 + (i * ((tableWidth - 20) / numChairsColumns)) + (tableWidth / numChairsColumns) / 2;
          const chairY = tableY - chairRadius - 10; // Postavite stolicu iznad stola
  
          // Crtanje stolice kao kruga
          ctx.beginPath();
          ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#6bcb69'; // Boja stolice
          ctx.fill();
          ctx.closePath();
      }
  
      // Raspored stolica duž donjeg dela stola
      for (let i = 0; (i < numChairsColumns) &&  s.obeStraneS; i++) {
          const chairX = tableX + 10 + (i * ((tableWidth - 20) / numChairsColumns)) + (tableWidth / numChairsColumns) / 2;
          let chairY = tableY+ + (1*tableHeight) + chairRadius + 10; // Postavite stolicu ispod stola
          
          // Crtanje stolice kao kruga
          ctx.beginPath();
          ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#6bcb69'; // Boja stolice
          ctx.fill();
          ctx.closePath();
      }
  
      // Raspored stolica duž leve strane stola
      for (let i = 0; i < numChairsRows; i++) {
          const chairX = tableX - chairRadius - 10; // Postavite stolicu levo od stola
          const chairY = tableY + 10 + (i * ((tableHeight - 20) / numChairsRows)) + (tableHeight / numChairsRows) / 2;
  
          // Crtanje stolice kao kruga
          ctx.beginPath();
          ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#6bcb69'; // Boja stolice
          ctx.fill();
          ctx.closePath();
      }
  
      // Raspored stolica duž desne strane stola
      for (let i = 0; (i < numChairsRows) &&  s.obeStraneD; i++) {
          const chairX = tableX + (1*tableWidth) + chairRadius + 10; // Postavite stolicu desno od stola
          const chairY = tableY + 10 + (i * ((tableHeight - 20) / numChairsRows)) + (tableHeight / numChairsRows) / 2;
  
          // Crtanje stolice kao kruga
          ctx.beginPath();
          ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#6bcb69'; // Boja stolice
          ctx.fill();
          ctx.closePath();
      }
      const index = this.stoloviCanvas.indexOf(canvas);
      const brojText = `${index + 1}`;
      const textMetrics = ctx.measureText(brojText);
      const textWidth = textMetrics.width;
      const textHeight = 20; 
  
      const textX = (tableX+tableWidth) / 2; 
      const textY = (tableY+tableHeight*1.85) / 2; 
  
      ctx.font = '20px Arial';
      ctx.fillStyle = '#000'; 
      ctx.fillText(brojText, textX, textY);
  }
  

  
  
  
  

    
  }

  kliknuto: number=0;
  ind: number=-1;
  poruka: string;
  izabranSto(index: number) {
    if(this.kliknuto>0 && this.ind!=index){

     this.poruka="Mozete izabrati samo jedan sto."; /*------------------------------------ */
      return;
    }
    this.ind=index;
    const selectedCanvas = this.stoloviCanvas[index];
    const context = selectedCanvas.getContext('2d');
    const sto = this.usluga.stolovi[index];
  
    if (this.stoloviCanvas[index].classList.contains('izabran')) {
      context.strokeStyle = '#e2f8e1';
      context.lineWidth = 0; 
      context.strokeRect(0, 0, selectedCanvas.width, selectedCanvas.height);
      this.kliknuto-=1;
      this.ind=-1;
      this.renderer.removeClass(this.stoloviCanvas[index], 'izabran');
    } else {
      context.strokeStyle = '#e4519a';
      context.lineWidth = 10; 
      context.strokeRect(0, 0, selectedCanvas.width, selectedCanvas.height);
      this.kliknuto+=1;
      this.renderer.addClass(this.stoloviCanvas[index], 'izabran');
    }
  }
  
  obrisiRaspored(index: number) {
    this.raspored.splice(index, 1);
  }
  
  ime: string;
  raspored: Raspored[]=[];
  dodaj(ime, index){
    if(index==0 || !this.ime){
      return;
    }
   
    let ima=0;
    for(let i=0;i<this.raspored.length; i++){
      if(this.raspored[i].sto==index){
        ima+=1;
      }
    }
    if(this.usluga.stolovi[index-1].vrsta=='o'){
      if(ima>=this.usluga.stolovi[index-1].stolicaO){
        this.poruka="Nemate više mesta za ovim stolom."
        return;
      }
    }else{
      let u=0;
      if(this.usluga.stolovi[index-1].obeStraneD ){
          u+=this.usluga.stolovi[index-1].stolicaPduzina*2
      }else{
        u+=this.usluga.stolovi[index-1].stolicaPduzina;
      }
      if(this.usluga.stolovi[index-1].stolicaPsirina ){
        u+=this.usluga.stolovi[index-1].stolicaPsirina*2
      }else{
        u+=this.usluga.stolovi[index-1].stolicaPsirina*2
      }
      if(ima>=u){
        this.poruka="Nemate više mesta za ovim stolom."
        return;
      }
    }


    let r=new Raspored()
    r.ime=ime;
    r.sto=index;
    this.raspored.push(r);
    this.ime=""
    this.raspored.sort((a, b) => a.sto - b.sto);
    this.poruka="";
  }

  sacuvaj(){
    this.raspored.sort((a, b) => a.sto - b.sto);

    this.servis.raspored(this.raspored, this.idDogadjaja).subscribe(() => { 
     
    })  
    alert("Sacuvali ste raspored!");
  }

}
