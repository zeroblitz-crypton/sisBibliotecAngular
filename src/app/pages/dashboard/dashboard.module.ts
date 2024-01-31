import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { DashboardInicioComponent } from '../dashboard-inicio/dashboard-inicio.component';
import { PrestamosComponent } from '../prestamos/prestamos.component';
import { EstudiantesComponent } from '../estudiantes/estudiantes.component';
import { MateriasComponent } from '../materias/materias.component';
import { LibrosComponent } from '../libros/libros.component';
import { ReportesComponent } from '../reportes/reportes.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';
import { AutorComponent } from '../autor/autor.component';
import { EditorialComponent } from '../editorial/editorial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
        {path: 'dashboardInicio', component:DashboardInicioComponent, canActivate:[AuthGuard]},

        {path: 'libros', component:LibrosComponent, canActivate:[AuthGuard]},
        {path: 'autor', component:AutorComponent, canActivate:[AuthGuard]},
        {path: 'editorial', component:EditorialComponent, canActivate:[AuthGuard]},
        {path: 'usuarios', component:UsuariosComponent, canActivate:[AuthGuard]},
        {path: 'configuracion', component:ConfiguracionComponent, canActivate:[AuthGuard]},
        {path: 'estudiantes', component:EstudiantesComponent, canActivate:[AuthGuard]},
        {path: 'materias', component:MateriasComponent, canActivate:[AuthGuard]},
        {path: 'reportes', component:ReportesComponent, canActivate:[AuthGuard]},
        {path: 'prestamos', component:PrestamosComponent, canActivate:[AuthGuard]},
    ],
  },
];


  
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardInicioComponent,
    PrestamosComponent,
    EstudiantesComponent,
    MateriasComponent,
    LibrosComponent,
    ReportesComponent,
    UsuariosComponent,
    ConfiguracionComponent,
    AutorComponent,
    EditorialComponent,
    
],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    
  ],
})
export class DashboardModule {}
