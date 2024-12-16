import { Component } from '@angular/core';
import { RUsuarioService } from '../services/RUsuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-registrar-u',
  templateUrl: './registrar-u.component.html',
  styleUrls: ['./registrar-u.component.css']
})
export class RegistrarUComponent {
  nombre: string = '';
  apellido: string = '';
  password: string = '';
  email: string = '';
  tipo: string = 'user';
  estado: string = 'activo';

  constructor(private rUsuarioService: RUsuarioService, private router: Router) {}

  onSubmit(): void {
    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      password: this.password,
      email: this.email,
      tipo: this.tipo,
      estado: this.estado,
    };

    this.rUsuarioService.crearUsuario(usuario).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente', response);
        alert('Usuario creado exitosamente');
        this.router.navigate(['/administrador']);
      },
      error: (error) => {
        console.error('Error al crear el usuario', error);
        alert('Hubo un error al crear el usuario');
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
