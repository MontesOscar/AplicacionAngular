  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { AdministradorComponent } from './administrador/administrador.component';
  import { RmasInfoComponent } from './rmas-info/rmas-info.component';
  import { InicioComponent} from './inicio/inicio.component'
  import { PersonasComponent } from './personas/personas.component';
  import { RegistrarUComponent } from './registrar-u/registrar-u.component'; 
  import { RegistrarRComponent } from './registrar-r/registrar-r.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MisReportesComponent } from './misreportes/misreportes.component';
import { ActualizarRComponent } from './actualizar-r/actualizar-r.component';
import { ReportesComponent } from './reportes/reportes.component';
  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet,InicioComponent, AdministradorComponent,ReportesComponent,
      RmasInfoComponent,PersonasComponent, RegistrarUComponent, RegistrarRComponent,
       UsuarioComponent, MisReportesComponent, ActualizarRComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {
    title = 'Incidencias';
  }
