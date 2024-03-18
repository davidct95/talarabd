import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  private apiUrl: string = 'http://localhost:8080/home'

  constructor( private http: HttpClient){ }

  getComponente(){
    const url = `${this.apiUrl}/componentesbd`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
  
    return this.http.get<any>(url, { headers: headers });
  }

  getPropiedades(id: string){
    const url = `${this.apiUrl}/p/${id}`
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.get<any>(url, { headers: headers });
  }

  getPoligonos(){
    const url = `${this.apiUrl}/allJson`
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.get<any>(url, { headers: headers });
  }

  delete(id: string){
    const url = `${this.apiUrl}/delete/${id}`
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.delete<any>(url, { headers: headers });
  }

  actualizarDatos(id: string, updatedData: any) {
    const url = `${this.apiUrl}/actualizar/${id}`;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });

    return this.http.put(url, updatedData, { headers: headers });
  }
}
