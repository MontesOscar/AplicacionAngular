import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  email: string = '';  
  password: string = '';  
  errorMessage: string = '';  
  isLoading: boolean = false;
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Por favor, ingrese el correo y la contraseña.';
      return;
    }

    this.isLoading = true; 

    this.usuarioService.getUsuario().subscribe({
      next: (response: any) => {
        this.isLoading = false; 

        const usuarios = response.responseUsuario.usuario; 
        const usuario = usuarios.find(
          (u: any) => u.email === this.email && u.password === this.password
        );

        if (usuario) {
          sessionStorage.setItem('userId', usuario.id);
          sessionStorage.setItem('userType', usuario.tipo);

          if (usuario.tipo === 'administrador') {
            this.router.navigate(['/administrador']);
          } else {
            this.router.navigate(['/usuario']);
          }
        } else {
          this.errorMessage = 'Correo o contraseña incorrectos.';
        }
      },
      error: () => {
        this.isLoading = false; 
        this.errorMessage = 'Ocurrió un error inesperado. Inténtelo de nuevo más tarde.';
      }
    });
  }
}
