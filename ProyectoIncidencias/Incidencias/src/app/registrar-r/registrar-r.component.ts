import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../services/registro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-r',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-r.component.html',
  styleUrls: ['./registrar-r.component.css']
})
export class RegistrarRComponent {
  reporte = {
    titulo: '',
    descripcion: '',
    estado: 'Activado',
    longitud: null,
    latitud: null,
    usuario: {
      id: 0 
    }
  };

  mensajeError: string = ''; 
  mostrarModal: boolean = false; 

  constructor(private registroService: RegistroService, private router: Router) {}

  registrarReporte() {
    if (!this.reporte.titulo || !this.reporte.descripcion || this.reporte.longitud === null || this.reporte.latitud === null) {
      this.mensajeError = 'Por favor, llena todos los campos antes de continuar.';
      return;
    }

    const usuarioId = sessionStorage.getItem('userId'); 
    if (usuarioId) {
      this.reporte.usuario.id = parseInt(usuarioId, 10); 
      console.log('ID de usuario al registrar reporte:', this.reporte.usuario.id); 
      this.registroService.registrarReporte(this.reporte).subscribe(
        (response) => {
          console.log('Reporte registrado exitosamente:', response);
          this.mostrarModal = true; 
        },
        (error) => {
          console.error('Error al registrar el reporte:', error);
        }
      );
    } else {
      console.error('No se encontró el id del usuario en sessionStorage.');
    }
  }

  cerrarModal() {
    this.mostrarModal = false; 
    this.router.navigate(['/misreportes']); 
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
