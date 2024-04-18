import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Raspored } from '../models/raspored';

@Component({
  selector: 'app-prikaz-rasporeda',
  templateUrl: './prikaz-rasporeda.component.html',
  styleUrls: ['./prikaz-rasporeda.component.css']
})
export class PrikazRasporedaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private servis: UserService) {}
  idDogadjaja: number;
  raspored: Raspored[]=[];
  grupisaniRaspored: { sto: number, raspored: Raspored[] }[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idDogadjaja=params['number']; 
      this.servis.dohvatiRaspored(this.idDogadjaja).subscribe((rasp: any) => {
        const rasporedArray = rasp.raspored; 
      
        rasporedArray.forEach((rasporedItem: any) => {
         
          let r = new Raspored();
          r.ime = rasporedItem.ime;
          r.sto = rasporedItem.sto;
          this.raspored.push(r);
        });
        const grupisaniRasporedMap = new Map<number, Raspored[]>();

        this.raspored.forEach((r) => {
          if (!grupisaniRasporedMap.has(r.sto)) {
            grupisaniRasporedMap.set(r.sto, []);
          }
          grupisaniRasporedMap.get(r.sto).push(r);
        });

        grupisaniRasporedMap.forEach((raspored, sto) => {
          this.grupisaniRaspored.push({ sto, raspored });
        });

        // Sortirajte grupisani raspored
        this.grupisaniRaspored.sort((a, b) => a.sto - b.sto);
  
      });
      
    });
  }

}
