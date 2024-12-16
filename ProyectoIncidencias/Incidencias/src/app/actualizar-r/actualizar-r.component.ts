import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MisReportesService } from '../services/misreportes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-r',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-r.component.html',
  styleUrls: ['./actualizar-r.component.css']
})
export class ActualizarRComponent implements OnInit {
  reporte: any = {
    id: 0,
    titulo: '',
    descripcion: '',
    estado: 'ACTIVO',
    longitud: null,
    latitud: null
  };

  mostrarModal: boolean = false;
  modalMensaje: string = '';
  accion: string = '';
  reporteIdParaAccion: number | null = null;

  constructor(
    private misReportesService: MisReportesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const reporteId = sessionStorage.getItem('reporteId');
    const reporteData = sessionStorage.getItem('reporte');

    if (reporteId && reporteData) {
      this.reporte = JSON.parse(reporteData);
    }
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
    this.accion = '';
  }

  confirmarAccion(): void {
    if (this.accion === 'actualizar' && this.reporteIdParaAccion !== null) {
      this.actualizarReporte();
    }
    this.cerrarModal();
  }

  actualizarReporte(): void {
    const userId = sessionStorage.getItem('userId'); 
    const idReporte = this.reporte.id;

    if (userId) {
      this.misReportesService.actualizarReporte(idReporte, parseInt(userId), this.reporte).subscribe({
        next: () => {
          console.log('Reporte actualizado correctamente');
          this.router.navigate(['/misreportes']);
        },
        error: (err) => {
          console.error('Error al actualizar el reporte', err);
        }
      });
    }
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
