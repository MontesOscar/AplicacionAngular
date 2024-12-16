import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../Interfaces/usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {
  usuarioList: UsuarioInterface[] = [];
  usuariosFiltrados: UsuarioInterface[] = [];
  buscarNombre: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(): void {
    this.usuarioService.getUsuario().subscribe({
      next: (result) => {
        const usuarios = result.responseUsuario?.usuario || [];
        this.usuarioList = usuarios.map((usuario: any) => ({
          id: usuario.id,
          nombre: usuario.nombre || 'Sin nombre',
          apellido: usuario.apellido || 'Sin apellido',
          email: usuario.email || 'Sin email',
          estado: usuario.estado || 'Desconocido',
          tipo: usuario.tipo || 'Desconocido',
        }));
        this.usuariosFiltrados = this.usuarioList;
      },
      error: (err: any) => {
        console.error('Error al obtener los usuarios:', err);
      },
    });
  }

  buscarUsuario(): void {
    if (!this.buscarNombre.trim()) {
      this.usuariosFiltrados = this.usuarioList;
      return;
    }
  
    const searchTerm = this.buscarNombre.trim().toLowerCase(); 
    this.usuariosFiltrados = this.usuarioList.filter(usuario =>
      usuario.nombre.toLowerCase().includes(searchTerm)  
    );
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
