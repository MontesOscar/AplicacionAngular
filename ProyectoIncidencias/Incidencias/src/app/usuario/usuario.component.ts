import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ResportesService } from '../services/reportes.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  constructor(private reporteService: ResportesService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    
  }
  
  navegar(url: string){
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
