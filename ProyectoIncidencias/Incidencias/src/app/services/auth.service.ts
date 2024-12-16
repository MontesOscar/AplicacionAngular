import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any;

  constructor() {
    // Recuperamos el usuario del almacenamiento local si ya está autenticado
    this.user = JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  // Obtener usuario autenticado
  getUser() {
    return this.user;
  }

  // Establecer usuario cuando se autentica
  setUser(user: any) {
    this.user = user;
    localStorage.setItem('usuario', JSON.stringify(user));  // Guardamos el usuario en el localStorage
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.user?.id;
  }

  // Limpiar la sesión del usuario
  logout() {
    this.user = null;
    localStorage.removeItem('usuario');
  }
}
