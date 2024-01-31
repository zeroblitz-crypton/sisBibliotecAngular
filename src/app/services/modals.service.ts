import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MateriaModalComponent } from '../modals/materia-modal/materia-modal.component';
import { AutoresModalComponent } from '../modals/autores-modal/autores-modal.component';
import { EditorialModalComponent } from '../modals/editorial-modal/editorial-modal.component';
import { EstudiantesModalComponent } from '../modals/estudiantes-modal/estudiantes-modal.component';
import { UsuariosModalComponent } from '../modals/usuarios-modal/usuarios-modal.component';
import { PermisoModalComponent } from '../modals/permiso-modal/permiso-modal.component';
import { LibroModalComponent } from '../modals/libro-modal/libro-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  public materiaModal: MatDialogRef<MateriaModalComponent> | null=null;
  public autorModal: MatDialogRef<AutoresModalComponent> | null=null;
  public editorialModal: MatDialogRef<EditorialModalComponent> | null=null;
  public estudianteModal: MatDialogRef<EstudiantesModalComponent> | null=null;
  public usuariosModal: MatDialogRef<UsuariosModalComponent> | null=null;
  public permisoModal: MatDialogRef<PermisoModalComponent> | null=null;
  public libroModal: MatDialogRef<LibroModalComponent> | null=null;

  constructor(private dialog: MatDialog) {}
  

  openModalLibro(libro?:any): void {
    this.libroModal = this.dialog.open(LibroModalComponent, {
      width: '50%', // Agrega comillas al valor del ancho
      data:libro
    });
  }
  closeModalLibro():void{
    if(this.libroModal){
      this.libroModal.close();
    }
  }

  openModalPermiso(id?:any): void {
    this.permisoModal = this.dialog.open(PermisoModalComponent, {
      width: '50%', // Agrega comillas al valor del ancho
      data:id  
    });
  }
  closeModalPermiso():void{
    if(this.permisoModal){
      this.permisoModal.close();
    }
  }

  openModalUsuario(usuario?:any): void {
    this.usuariosModal = this.dialog.open(UsuariosModalComponent, {
      width: '50%', // Agrega comillas al valor del ancho
      data:usuario
    });
  }
  closeModalUsuario():void{
    if(this.usuariosModal){
      this.usuariosModal.close();
    }
  }

  openModalEstudiante(estudiante?:any): void {
    this.estudianteModal = this.dialog.open(EstudiantesModalComponent, {
      width: '50%', // Agrega comillas al valor del ancho
      data:estudiante
    });
  }
  closeModalEstudiante():void{
    if(this.estudianteModal){
      this.estudianteModal.close();
    }
  }
  
  openModalEditorial(editorial?:any): void {
    this.editorialModal = this.dialog.open(EditorialModalComponent, {
      width: '20%', // Agrega comillas al valor del ancho
      data:editorial
    });
  }
  closeModalEditorial():void{
    if(this.editorialModal){
      this.editorialModal.close();
    }
  }

  openModalMateria(materia?:any): void {
    this.materiaModal = this.dialog.open(MateriaModalComponent, {
      width: '20%', // Agrega comillas al valor del ancho
      data:materia
    });
  }
  closeModalMateria():void{
    if(this.materiaModal){
      this.materiaModal.close();
    }
  }

  openModalAutor(autor?:any): void {
    this.autorModal = this.dialog.open(AutoresModalComponent, {
      width: '20%', // Agrega comillas al valor del ancho
      data:autor
    });
  }
  closeModalAutor():void{
    if(this.autorModal){
      this.autorModal.close();
    }
  }

}
