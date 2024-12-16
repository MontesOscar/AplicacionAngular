import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RUsuarioService {
  API_URL: string = 'http://localhost:8080/Admin/UCrear';

  constructor(private httpClient: HttpClient) {}

  
  crearUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(this.API_URL, usuario);
  }
  
}
