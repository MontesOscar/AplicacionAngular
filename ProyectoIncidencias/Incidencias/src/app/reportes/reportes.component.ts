import { Component, OnInit } from '@angular/core';
import { ResportesService } from '../services/reportes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reportes: any[] = [];
  filteredReportes: any[] = [];
  searchText: string = '';
  mostrarModal: boolean = false;
  modalMensaje: string = '';
  accion: 'eliminar' | 'actualizar' | null = null; 
  reporteIdParaAccion: number | null = null; 
  estadoActual: string = ''; 

  constructor(
    private reportesService: ResportesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.reportesService.getReportes().subscribe({
      next: (response: any) => { 
        console.log("Respuesta del servicio:", response);
        const reportes = response.responseReporte.reporte;
        if (Array.isArray(reportes)) {
          this.reportes = reportes.filter((reporte: any) =>
            reporte.estado === 'Activado' || reporte.estado === 'Desactivado'
          );
          this.filteredReportes = [...this.reportes];
        } else {
          console.error('No se encontraron reportes en la respuesta.');
        }
      },
      error: (err: HttpErrorResponse) => { 
        console.error('Error al cargar los reportes', err);
      }
    });
  }

  filtrarReportes(): void {
    if (this.searchText.trim()) {
      this.filteredReportes = this.reportes.filter((reporte: any) =>
        reporte.titulo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        reporte.descripcion.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredReportes = [...this.reportes];
    }
  }

  mas(id: number): void {
    console.log('Redirigiendo a /masInfo/' + id);
    this.router.navigate([`/masInfo/${id}`]);
  }

  mostrarModalConfirmacion(accion: 'eliminar' | 'actualizar', reporteId: number, estado: string): void {
    this.accion = accion;
    this.reporteIdParaAccion = reporteId;
    this.estadoActual = estado;
  
    if (accion === 'eliminar') {
      this.modalMensaje = '¿Estás seguro de que quieres eliminar este reporte?';
    } else if (accion === 'actualizar') {
      this.modalMensaje = `¿Estás seguro de que quieres ${estado === 'ACTIVO' ? 'desactivar' : 'activar'} este reporte?`;
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
      this.actualizarEstadoReporte(this.reporteIdParaAccion);
    }
    this.cerrarModal();
  }

  eliminarReporte(id: number): void {
    console.log(`Eliminando reporte con ID: ${id}`);
  }

  actualizarEstadoReporte(id: number): void {
    const nuevoEstado = this.estadoActual === 'Activado' ? 'Desactivado' : 'Activado';
    
    this.reportesService.actualizarEstado(id, nuevoEstado).subscribe({
      next: (response: any) => {
        console.log('Estado actualizado:', response);
        this.cargarReportes();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al actualizar el estado del reporte', err);
      }
    });
  }
  viajar(path: string): void {
    this.router.navigate([path]);
  
}
  
}
