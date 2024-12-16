import { Routes } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { ReportesComponent } from './reportes/reportes.component';
import { RmasInfoComponent } from './rmas-info/rmas-info.component';
import { PersonasComponent } from './personas/personas.component';
import { RegistrarUComponent } from './registrar-u/registrar-u.component'; 
import { RegistrarRComponent } from './registrar-r/registrar-r.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MisReportesComponent } from './misreportes/misreportes.component';
import { ActualizarRComponent } from './actualizar-r/actualizar-r.component';


export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch:'full'},
    {path: 'inicio',component: InicioComponent},
    {path: 'actualizarR',component: ActualizarRComponent},
    {path: 'misreportes', component: MisReportesComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'administrador', component: AdministradorComponent},
    {path: 'reportes', component: ReportesComponent},
    { path: 'masInfo/:id', component: RmasInfoComponent },
    {path: 'personas', component: PersonasComponent},
    {path: 'registrarU', component: RegistrarUComponent},
    {path: 'registrarR', component: RegistrarRComponent}
];
