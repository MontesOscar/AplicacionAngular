import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResportesService {
  API_GET_URL: string = 'http://localhost:8080/Admin/Rtodos';
  API_POST_URL: string = 'http://localhost:8080/Admin/Rcrear'; 
  private readonly API_UPDATE_URL = 'http://localhost:8080/Admin';

  constructor(private httpClient: HttpClient) {}

  
  getReportes(): Observable<any> {
    return this.httpClient.get<any>(this.API_GET_URL);
  }

  crearReporte(reporte: any): Observable<any> {
    return this.httpClient.post(this.API_POST_URL, reporte);
  }

  actualizarEstado(reporteId: number, nuevoEstado: string): Observable<any> {
    const url = `${this.API_UPDATE_URL}/REliminar/${reporteId}`;
    const body = { estado: nuevoEstado }; 
    
    return this.httpClient.put(url, body); 
  }
  
  
}
