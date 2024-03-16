import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  private apiUrl: string = 'http://localhost:8080/home'

  constructor( private http: HttpClient){ }

  getComponente(){
    const url = `${this.apiUrl}/componentesbd`;
    return this.http.get<any>(url);
  }

  getPropiedades(id: string){
    const url = `${this.apiUrl}/p/${id}`
    return this.http.get<any>(url);
  }

  getPoligonos(){
    const url = `${this.apiUrl}/allJson`
    return this.http.get<any>(url);
  }
}
