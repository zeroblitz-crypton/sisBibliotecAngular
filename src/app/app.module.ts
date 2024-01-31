import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginModule } from './pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { MateriaModalComponent } from './modals/materia-modal/materia-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AutoresModalComponent } from './modals/autores-modal/autores-modal.component';
import { EditorialModalComponent } from './modals/editorial-modal/editorial-modal.component';
import { EstudiantesModalComponent } from './modals/estudiantes-modal/estudiantes-modal.component';
import { UsuariosModalComponent } from './modals/usuarios-modal/usuarios-modal.component';
import { PermisoModalComponent } from './modals/permiso-modal/permiso-modal.component';
import { LibroModalComponent } from './modals/libro-modal/libro-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    MateriaModalComponent,
    AutoresModalComponent,
    EditorialModalComponent,
    EstudiantesModalComponent,
    UsuariosModalComponent,
    PermisoModalComponent,
    LibroModalComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    DashboardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
