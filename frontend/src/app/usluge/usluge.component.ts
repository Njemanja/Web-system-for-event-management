import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Sto } from '../models/sto';
import * as L from 'leaflet';

@Component({
  selector: 'app-usluge',
  templateUrl: './usluge.component.html',
  styleUrls: ['./usluge.component.css']
})
export class UslugeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasDiv', { static: false }) canvasDiv: ElementRef;
  private context: CanvasRenderingContext2D;
  private stoloviCanvas: HTMLCanvasElement[] = [];

    ime: string;
    mesto: string;
    telefon: string;
    email: string;
    slika: unknown;
    galerija: unknown[]=[];
    slobodnaMesta: number;
    slikaDobra=false;
    poruka: string;
    vrsta: string;
    slike: [];
    showAdditionalFields: boolean = false; // Promenljiva za prikazivanje/skrivanje dodatnih polja
    isChecked: boolean = false;
    isChecked1: boolean = false;
    tekst: string;
    brojStolova: number;
    imaUGaleriji: boolean;
    stolovi: Sto[]=[];
    constructor(private elementRef: ElementRef,private renderer: Renderer2, private servis: UserService, private router: Router) {}  
    ngOnInit(){
      if(localStorage.getItem("status")!="Usluge"){
        this.router.navigate(['/login']);
      }
      this.stolovi=[];
    }
   
    ngAfterViewInit() {
      this.imaUGaleriji=false;
      this.vrsta='Muzika'
      
    
    }
    odjava(){
      localStorage.setItem("korisnickoIme", "");
      localStorage.setItem("status", "");
      this.router.navigate(['/login']);
    }


    vrstaStola: string = 'Okrugli'; 
    showAdditionalStolFields: boolean = false; 
    precnikStola: number = 0; 
    brojStolicaOkrugli: number = 0; 
    sirinaStola: number = 0; 
    duzinaStola: number = 0; 
    brojStolicaPravougaoni: number = 0; 
    brojStolicaPravougaoniDuzina:  number = 0; 
    brojStolicaPravougaoniSirina:  number = 0;  
    
    vrstaStolaChanged() {
      this.showAdditionalStolFields = (this.vrsta === 'Restoran' || this.vrsta === 'Kafić') && this.vrstaStola === 'Okrugli';
    }
    promeni(){
      this.isChecked=!this.isChecked;
    }
    promeni1(){
      this.isChecked1=!this.isChecked1;
    }
    
    dodajSto(precnikStola, brojStolicaOkrugli, sirinaStola, duzinaStola, brojStolicaPravougaoni, vrstaStola) {
      
      
     
      if (vrstaStola == 'Okrugli') {
        let s=new Sto();
        s.r=this.precnikStola;
        s.stolicaO=this.brojStolicaOkrugli
        s.vrsta='o';
        s.obeStraneS=this.isChecked;
        s.obeStraneD=this.isChecked1;
        this.stolovi.push(s);

        const canvas = this.renderer.createElement('canvas');
        this.renderer.setAttribute(canvas, 'width', '400');
        this.renderer.setAttribute(canvas, 'height', '200');
      
        this.renderer.appendChild(this.canvasDiv.nativeElement, canvas);
        this.stoloviCanvas.push(canvas);
        const deleteButton = this.renderer.createElement('button');
        this.renderer.setProperty(deleteButton, 'textContent', 'Obriši');
        this.renderer.setStyle(deleteButton, 'display', 'block');
        this.renderer.setStyle(deleteButton, 'margin', '0 auto');
        this.renderer.addClass(deleteButton, 'stoClass'); 
        this.renderer.listen(deleteButton, 'click', () => {
          this.obrisiSto(canvas, deleteButton);
        });
        const context = canvas.getContext('2d');
        let ctx = context;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const tableRadius = precnikStola/4;
    
        ctx.beginPath();
        ctx.arc(centerX, centerY, tableRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#e4519a'; 
        ctx.fill();
        ctx.closePath();
    
        const numChairs = brojStolicaOkrugli;
        const chairRadius = precnikStola/20;
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
        
        this.renderer.appendChild(this.canvasDiv.nativeElement, deleteButton);
      }
      if (vrstaStola == 'Pravougaoni') {
        let s1=new Sto();
        s1.x=this.sirinaStola;
        s1.y=this.duzinaStola
        s1.stolicaPduzina=this.brojStolicaPravougaoniDuzina
        s1.stolicaPsirina=this.brojStolicaPravougaoniSirina
        s1.obeStraneS=this.isChecked;
        s1.obeStraneD=this.isChecked1;
        s1.vrsta='p';
        this.stolovi.push(s1);
        const canvas = this.renderer.createElement('canvas');
        this.renderer.setAttribute(canvas, 'width', '400');
        this.renderer.setAttribute(canvas, 'height', '500');
      
        this.renderer.appendChild(this.canvasDiv.nativeElement, canvas);
      
        this.stoloviCanvas.push(canvas);
        const deleteButton = this.renderer.createElement('button');
        this.renderer.setProperty(deleteButton, 'textContent', 'Obriši');
        this.renderer.setStyle(deleteButton, 'display', 'block');
        this.renderer.setStyle(deleteButton, 'margin', '0 auto');
        this.renderer.addClass(deleteButton, 'stoClass'); 
        this.renderer.listen(deleteButton, 'click', () => {
          this.obrisiSto(canvas, deleteButton);
        });
        const context = canvas.getContext('2d');
        let ctx = context;
        const tableWidth = parseInt(sirinaStola);
        const tableHeight = parseInt(duzinaStola);
        const tableX = canvas.width / 2 - tableWidth / 2;
        const tableY = canvas.height / 2 - tableHeight / 2;
        const chairRadius = 10;
    
        ctx.fillStyle = '#e4519a'; 
        ctx.fillRect(tableX, tableY, tableWidth, tableHeight);
    
        
        const numChairsRows = this.brojStolicaPravougaoniSirina;
        const numChairsColumns = this.brojStolicaPravougaoniDuzina;
    
      
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
    
      
        for (let i = 0; (i < numChairsColumns) && this.isChecked; i++) {
            const chairX = tableX + 10 + (i * ((tableWidth - 20) / numChairsColumns)) + (tableWidth / numChairsColumns) / 2;
            const chairY = tableY + tableHeight + chairRadius + 10; // Postavite stolicu ispod stola
    
            // Crtanje stolice kao kruga
            ctx.beginPath();
            ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#6bcb69'; // Boja stolice
            ctx.fill();
            ctx.closePath();
        }
    
       
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
    
      
        for (let i = 0; (i < numChairsRows) && this.isChecked1; i++) {
            const chairX = tableX + tableWidth + chairRadius + 10;
            const chairY = tableY + 10 + (i * ((tableHeight - 20) / numChairsRows)) + (tableHeight / numChairsRows) / 2;
    
           
            ctx.beginPath();
            ctx.arc(chairX, chairY, chairRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#6bcb69'; 
            ctx.fill();
            ctx.closePath();
        }
        this.renderer.appendChild(this.canvasDiv.nativeElement, deleteButton);
    }
    

    
    
    
    
    
    
    
    
    
      
      
    }
    

    obrisiSto(canvas, deleteButton) {
      const index = this.stoloviCanvas.indexOf(canvas);
      if (index !== -1) {
        this.stoloviCanvas.splice(index, 1);
        this.renderer.removeChild(this.canvasDiv.nativeElement, canvas);
        this.renderer.removeChild(this.canvasDiv.nativeElement, deleteButton);
      }
    }

    


    vrstaChanged() {
      this.showAdditionalFields = this.vrsta === 'Restoran' || this.vrsta === 'Kafić';
    }
    kIme: string;
    potvrdi(){
      


      this.kIme=localStorage.getItem("korisnickoIme");
      if( !this.ime || !this.mesto || !this.telefon || !this.email || this.galerija.length==0 || !this.tekst ){
        this.poruka="Unesite sva polja."

      }else{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(this.email)) {
          this.poruka="Email adresa nije validna."
            return;
        }
        const phoneRegex = /^\+\d{10}$/;
        if (!phoneRegex.test(this.telefon)) {
          this.poruka="Broj telefona nije validan."
          return;
        } 

        this.servis.dodajUslugu(this.video,this.ime,this.mesto, this.telefon, this.email, this.galerija, this.vrsta, this.tekst, this.stolovi,  this.kIme).subscribe(()=>{
         
        })
        alert("Uspesno ste dodali uslugu.")
      }


      
     
  }


  video: string;

    fileUrl;
   
    ucitajSliku(event){
      this.poruka=""
      let dobra=true
      let file= (event.target as HTMLInputElement).files[0]
      var ext = file.name.substr(file.name.lastIndexOf('.') + 1)
      if(ext!="jpg"){
        dobra=false 
      }
      if(ext=="png"){
        dobra=true
      }
      
    if(dobra){
      this.convertToBase64(file)
      this.slikaDobra=true;
      this.poruka=""
      this.imaUGaleriji=true;
    }else{
      this.poruka="Slika mora biti JPG/PNG!"
      this.slikaDobra=false;
    }
    }
    ucitajGaleriju(event){
      if((event.target as HTMLInputElement).files.length>5){
        this.poruka="Ne moze vise od 5 slika!"
      }else{
        for(let i=0;i<(event.target as HTMLInputElement).files.length; i++){
          let dobra=true
          let file= (event.target as HTMLInputElement).files[i]
          var ext = file.name.substr(file.name.lastIndexOf('.') + 1)
          if(ext!="jpg"){
            dobra=false 
          }
          if(ext=="png"){
            dobra=true
          }
          if(dobra){
            this.imaUGaleriji=true;
            this.convertToBase64_Galerija(file)
          }
        }
      }
      
    }
  
   
      
  
    convertToBase64_Galerija(file){
      let ob=new Observable((subscriber)=>{
        this.readFile(file, subscriber)
      })
      ob.subscribe((slika)=>{
        this.galerija.push(slika)
      })
    }
  
    convertToBase64(file){
      let ob=new Observable((subscriber)=>{
        this.readFile(file, subscriber)
      })
      ob.subscribe((slika)=>{
        this.slika=slika;
      })
    }
  
    obrisiSlikuIzGalerije(g){
        let indexToRemove = this.galerija.findIndex(function(element) {
        return element === g;
      });
    
      if (indexToRemove !== -1) {
          this.galerija.splice(indexToRemove, 1);
      }
      if(this.galerija.length==0){
        this.imaUGaleriji=false;
        const fileInput = this.elementRef.nativeElement.querySelector('#fileInput');
        if (fileInput) {
          fileInput.value = []; 
        }
      }
    }
  
  
    readFile(file, subscriber){
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>{
        subscriber.next(reader.result);
        subscriber.complite()
      }
    }
    
    obrisiGaleriju(){
      this.galerija=[]
      this.imaUGaleriji=false;
      this.poruka=""
      const fileInput = this.elementRef.nativeElement.querySelector('#fileInput');
      if (fileInput) {
        fileInput.value = [];
      }
    }


    

    
    selectedVideo: File | null = null;

  onVideoSelected(event: any) {
    this.selectedVideo = event.target.files[0];
  }

  uploadVideo(event: Event) {
    event.preventDefault();
    if (this.selectedVideo) {
      const formData = new FormData();
      formData.append('video', this.selectedVideo);
    } 
  }










}
