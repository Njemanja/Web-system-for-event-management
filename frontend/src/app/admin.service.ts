import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

 constructor(private http: HttpClient) { }
 uri='http://127.0.0.1:4000'


 dohvatiUsluge(){
    const data={}
    return this.http.post(`${this.uri}/admin/dohvati`, data);

  }

potvrdi(id){
  const data={id: id}
  return this.http.post(`${this.uri}/admin/potvrdi`, data);

}
 
  
}
