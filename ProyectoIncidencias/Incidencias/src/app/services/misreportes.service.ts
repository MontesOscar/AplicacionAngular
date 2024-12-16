  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class MisReportesService {

    private apiUrl = 'http://localhost:8080/Usuario/Todos'; 
    private baseUrl = 'http://localhost:8080';  
    private baseUr = 'http://localhost:8080/Admin/REliminar/';

    constructor(private http: HttpClient) { }

   
    getReportesByUserId(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

   
    getReporteById(id: string): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/Usuario/RReporte/${id}`);
    }

   
    eliminarR(idR: number, idU: number): Observable<any> {
      const url = `${this.baseUrl}/Usuario/REliminar/${idR}/${idU}`;
      const body = {
        estado: 'Desactivado'
      };
      return this.http.put(url, body);
    }

  
  actualizarReporte(idReporte: number, idUsuario: number, reporte: any): Observable<any> {
    const url = `${this.baseUrl}/Usuario/RActualizar/${idReporte}/${idUsuario}`;
    return this.http.put<any>(url, reporte);  
  }
  actualizarEstadoReporte(id: number, estado: string): Observable<any> {
    const payload = { estado }; 
    return this.http.put(`${this.baseUr}${id}`, payload);
  }

  }
