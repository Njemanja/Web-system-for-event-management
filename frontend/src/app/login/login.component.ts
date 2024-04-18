import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { UserService } from '../user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lozinka: string;
  korisnickoIme: string;
  poruka: string;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {

  }
  register(){
    this.router.navigate(['/register']);

  }
  login(){
    if(!this.lozinka ||  !this.korisnickoIme){
      this.poruka="Niste uneli sve podatke."
    }else{
      this.userService.login(this.korisnickoIme, this.lozinka).subscribe((user: User)=>{
        if(user){
          localStorage.setItem('korisnickoIme', this.korisnickoIme);
           localStorage.setItem("status", user.status);
          if(this.korisnickoIme=="Admin"){
            this.router.navigate(['admin']);
            return;
          }
          if(user.status=="Korisnik"){
           
            this.router.navigate(['/ponuda']);
        
          }else{
            this.router.navigate(['/usluge']);
          }
        }else{
          this.poruka="Podaci nisu ispravni."
        }
          
      });
    }
  }
}
