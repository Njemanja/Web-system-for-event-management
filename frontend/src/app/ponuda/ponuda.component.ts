import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.css']
})
export class PonudaComponent implements OnInit {

  constructor(private servis: UserService, private router: Router){}

  ngOnInit(): void {
    if(localStorage.getItem("status")!="Korisnik"){
      this.router.navigate(['']);
    }
  }

  ponuda(s){
    localStorage.setItem("vrsta", s);
  }
  odjava(){
    localStorage.setItem("korisnickoIme", "");
    localStorage.setItem("status", "");
    this.router.navigate(['/login']);
  }


}
