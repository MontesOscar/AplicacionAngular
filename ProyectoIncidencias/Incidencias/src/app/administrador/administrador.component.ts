import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ReportesInterface } from '../Interfaces/reportes.interface';
import { ResportesService } from '../services/reportes.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit {
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
