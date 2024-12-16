import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  API_URL: string = 'http://localhost:8080/Admin/Utodos';
  constructor(private httpClient :HttpClient) {}
  getUsuario(): Observable<any>{
    return this.httpClient.get(this.API_URL).pipe(res=>res);
  }
  
  
}
