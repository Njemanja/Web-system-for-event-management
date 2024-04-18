import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 constructor(private http: HttpClient) { }
 uri='http://127.0.0.1:4000'

 
 login(korisnickoIme, lozinka){
  const data={
    korisnickoIme: korisnickoIme,
    lozinka: lozinka
  }
  return this.http.post(`${this.uri}/users/login`, data);
}


 register(korisnickoIme, lozinka, ime, prezime, datumRodjenja, telefon, email,status){
    const data={
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      datumRodjenja: datumRodjenja,
      telefon: telefon,
      email: email,
      status: status
    }
    return this.http.post(`${this.uri}/users/register`, data);
  }

  izmeniInformacije(korisnickoIme, lozinka, ime, prezime, datumRodjenja, telefon, email,status){
    const data={
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      datumRodjenja: datumRodjenja,
      telefon: telefon,
      email: email,
      status: status
    }
    return this.http.post(`${this.uri}/users/izmeniInformacije`, data);
  }

  dodajKalendar(niz, k){
    const data={
      kalendar: niz,
      korisnickoIme: k
    }
    return this.http.post(`${this.uri}/users/dodajKalendar`, data);

  }

  dohvatiKalendar(k){
    const data={
      korisnickoIme: k
    }
    return this.http.post(`${this.uri}/users/dohvatiKalendar`, data);

  }

  dohvatiUslugu(k){
    const data={
      id: k
    }
    return this.http.post(`${this.uri}/users/dohvatiUslugu`, data);

  }




  send(korisnickoIme,text, mail){
    const data={
      korisnickoIme: korisnickoIme,
      text: text,
      mail: mail
    }
    return this.http.post(`${this.uri}/users/support`, data);
  }
 
  dodajUslugu(video,ime,mesto, telefon, email, galerija, vrsta, text, stolovi,  kIme){
    const data={
      video: video,
      ime: ime,
      mesto: mesto,
      telefon: telefon,
      email: email,
      galerija: galerija,
      opis:text,
      stolovi: stolovi,
      vrsta: vrsta,
      korisnickoIme: kIme
    }
    alert(video);
    
    return this.http.post(`${this.uri}/users/dodajUslugu`, data);
  }

  izmeniUslugu(ime,mesto, telefon, email, galerija, vrsta, text, stolovi,  kIme, id){
    const data={
      ime: ime,
      mesto: mesto,
      telefon: telefon,
      email: email,
      galerija: galerija,
      opis:text,
      stolovi: stolovi,
      vrsta: vrsta,
      korisnickoIme: kIme,
      id: id 
    }
    return this.http.post(`${this.uri}/users/izmeniUslugu`, data);
  }

  dohvatiKorisnika(korisnickoIme){
    const data={
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/users/dohvatiKorisnika`, data);

  }

  dohvatiUsluge(korisnickoIme){
    const data={
      korisnickoIme: korisnickoIme
    }
    return this.http.post(`${this.uri}/users/dohvatiUsluge`, data);

  }
  
  dohvatiSveUsluge(){
    const data={
    }
    return this.http.post(`${this.uri}/users/dohvatiSveUsluge`, data);

  }
  napraviDogadjaj(naziv, mesto, vreme, limit, opis, osobe, hrana, pice, ostalo, zelje, ulica, kIme, idMesta){
    const data={
      naziv: naziv,
      mesto: mesto,
      vreme: vreme,
      limit: limit,
      opis: opis,
      osobe: osobe,
      hrana: hrana,
      pice: pice,
      ostalo: ostalo,
      zelje: zelje,
      ulica: ulica,
      korisnickoIme: kIme,
      idMesta: idMesta
    }
    return this.http.post(`${this.uri}/users/napraviDogadjaj`, data);

  }

  mojiDogjadjaji(ime){
   const data={
    korisnickoIme: ime
   }
   return this.http.post(`${this.uri}/users/mojiDogadjaji`, data);

  }
  dolazak(id){
    const data={
     korisnickoIme: id
    }
    return this.http.post(`${this.uri}/users/mojiDogadjaji`, data);
 
   }
   potvrdiDolazak(id, email, ime){
    const data={
     korisnickoIme: id,
     email: email,
     ime: ime
    }
    return this.http.post(`${this.uri}/users/email`, data);
 
   }

   posaljiPozivnicu(p, link, qr, email, raspored){
    const data={
     pozivnica: p,
     link: link,
     qr: qr,
     email: email,
     raspored: raspored
    }
    return this.http.post(`${this.uri}/users/pozivnica`, data);
 
   }

   dolazim(hrana, pice,zelje, ostalo, ime, id ){
    const data={
      id: id,
      hrana: hrana,
      pice: pice,
      pokloni: zelje,
      ostalo: ostalo,
      ime: ime
    
    }
    return this.http.post(`${this.uri}/users/dolazim`, data);
 
   }
   gosti(id){
    const data={
     id: id
    }
    return this.http.post(`${this.uri}/users/gosti`, data);
 
   }

   raspored(r,id){
    const data={
     id: id,
     raspored: r
    }
    return this.http.post(`${this.uri}/users/raspored`, data);
 
   }

   dohvatiRaspored(id){
    const data={
     id: id
    }
    return this.http.post(`${this.uri}/users/dohvatiRaspored`, data);
 
   }
}
