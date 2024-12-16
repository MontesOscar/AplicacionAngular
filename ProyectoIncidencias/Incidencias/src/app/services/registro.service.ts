import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:8080/Usuario/RCrear'; 

  constructor(private http: HttpClient) { }

  registrarReporte(reporte: any): Observable<any> {
    return this.http.post(this.apiUrl, reporte); 
  }
}
