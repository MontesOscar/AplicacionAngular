import { Component, OnInit } from '@angular/core';
import { MisReportesService } from '../services/misreportes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misreportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './misreportes.component.html',
  styleUrls: ['./misreportes.component.css']
})
export class MisReportesComponent implements OnInit {
  reportes: any[] = []; 
  userId: number = 0;  
  mostrarModal: boolean = false; 
  reporteIdParaAccion: number | null = null; 
  accion: 'eliminar' | 'actualizar' | null = null;
  modalMensaje: string = '';

  constructor(private misReportesService: MisReportesService, private router: Router) {}

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem('userId') || '0', 10);
    console.log("User ID desde sessionStorage:", this.userId);  

    if (this.userId) {
      this.cargarReportes();
    } else {
      console.error('No se ha encontrado el ID del usuario.');
    }
  }


  cargarReportes(): void {
    this.misReportesService.getReportesByUserId(this.userId).subscribe({
      next: (response) => {
        console.log("Respuesta del servicio:", response); 

        const reportes = response.responseReporte.reporte;
        if (Array.isArray(reportes)) {
          this.reportes = reportes.filter((reporte: any) =>
            reporte.estado === 'Activado' && reporte.usuario.id === this.userId 
          );
          console.log("Reportes filtrados:", this.reportes); 
        } else {
          console.error('No se encontraron reportes en la respuesta.');
        }
      },
      error: (err) => {
        console.error('Error al cargar los reportes', err);
      }
    });
  }

  mostrarModalConfirmacion(accion: 'eliminar' | 'actualizar', reporteId: number): void {
    this.accion = accion;
    this.reporteIdParaAccion = reporteId;
    if (accion === 'eliminar') {
      this.modalMensaje = '¿Estás seguro de que quieres eliminar este reporte?';
    } else if (accion === 'actualizar') {
      this.modalMensaje = '¿Estás seguro de que quieres actualizar este reporte?';
    }
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.reporteIdParaAccion = null;
    this.accion = null;
  }

  confirmarAccion(): void {
    if (this.accion === 'eliminar' && this.reporteIdParaAccion !== null) {
      this.eliminarReporte(this.reporteIdParaAccion);
    } else if (this.accion === 'actualizar' && this.reporteIdParaAccion !== null) {
      this.irAActualizar(this.reporteIdParaAccion, 'actualizarR');
    }
    this.cerrarModal();
  }

  eliminarReporte(idR: number): void {
    this.misReportesService.eliminarR(idR, this.userId).subscribe({
      next: () => {
        console.log(`Reporte con ID ${idR} marcado como "Desactivado".`);
        this.reportes = this.reportes.filter(reporte => reporte.id !== idR);
      },
      error: (err) => {
        console.error(`Error al desactivar el reporte con ID ${idR}`, err);
      }
    });
  }

  irAActualizar(reporteId: number, url: string): void {
    const reporte = this.reportes.find(r => r.id === reporteId);
    
    sessionStorage.setItem('reporteId', reporteId.toString());
    sessionStorage.setItem('reporte', JSON.stringify(reporte));

    this.router.navigate([url]);
  }

  viajar(url: string): void {
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
