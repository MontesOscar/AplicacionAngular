import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesInterface } from '../Interfaces/reportes.interface';
import { ResportesService } from '../services/reportes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rmas-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rmas-info.component.html',
  styleUrls: ['./rmas-info.component.css']
})
export class RmasInfoComponent implements OnInit {
  reportesList3: ReportesInterface[] = [];
  idReporte: number = 0;

  constructor(
    private reporteService: ResportesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idReporte = +params['id']; 
      this.getReporteId();
    });
  }

  getReporteId(): void {
    this.reporteService.getReportes().subscribe({
      next: (result: any) => { 
        console.log('Respuesta completa de la API:', result); 
        const reportes = result?.responseReporte?.reporte || [];
        const reporteFiltrado = reportes.filter((reporte: any) => reporte.id === this.idReporte);
        this.reportesList3 = reporteFiltrado.map((reporte: any) => ({
          nombre: reporte.usuario?.nombre || 'Sin nombre', 
          apellido: reporte.usuario?.apellido || 'Sin apellido', 
          email: reporte.usuario?.email || 'Sin email', 
          estadoUsuario: reporte.usuario?.estado || 'Desconocido'
        }));
        console.log('Datos procesados para la tabla:', this.reportesList3); 
      },
      error: (err) => {
        console.error('Error al obtener los reportes:', err); 
      }
    });
  }

  navegar(url: string): void {
    if (url === '/inicio') {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('reporte');
      sessionStorage.removeItem('reporteId');
      sessionStorage.removeItem('userType');
      console.log('ID de usuario eliminado del sessionStorage');
      this.router.navigate(['/inicio']);
    } else {
      this.router.navigate([url]);
    }
  }
}
