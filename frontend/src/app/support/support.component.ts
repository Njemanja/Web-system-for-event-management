import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(private servis: UserService, private router: Router){}
  text: string
  korisnickoIme: string
  email:string;
  ngOnInit(): void {
    this.email="";
    this.korisnickoIme=localStorage.getItem("korisnickoIme");
    if(!this.korisnickoIme){
      this.router.navigate(['/login']);
    }
   
  }

  send(){
   
    
    this.servis.send(this.korisnickoIme, this.text, this.email).subscribe((resp)=>{
    
    })
    alert("Uspesno ste poslali poruku.")
    this.text="";

    
  }

  letovi(){
    this.router.navigate(['/flights']);

  }

}
