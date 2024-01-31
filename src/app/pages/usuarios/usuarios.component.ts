import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { ModalsService } from '../../services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  usuarios:any=[]
  auxusuarios:any=[]
  searchUsuario=""
  constructor(
    private usuarioService:UsuariosService,
    private modalService:ModalsService
  ){

  }

  ngOnInit(){
   this.listarUsuarios()
  }

  listarUsuarios(){
    this.usuarioService.getUsuarios().subscribe(data=>{
      this.usuarios=data.usuarios
      this.auxusuarios=data.usuarios
      console.log(data);
      
    })
  }

  openModal(usuario:any){
    this.modalService.openModalUsuario(usuario)
    this.modalService.usuariosModal?.afterClosed().subscribe(data=>{
      this.listarUsuarios()
    })
  }

  openModalPermiso(id:any){
    this.modalService.openModalPermiso(id)
    this.modalService.permisoModal?.afterClosed().subscribe(data=>{
      this.listarUsuarios()
    })
  }
  searchUsuarios(){
    this.usuarios = this.auxusuarios.filter((prod:any)=> 
    prod.usuario.toLowerCase().includes(this.searchUsuario.toLowerCase()) ||
    prod.nombre.toLowerCase().includes(this.searchUsuario.toLowerCase())
    )
  }

  eliminarUsuario(id:any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(id).subscribe(data=>{
          this.listarUsuarios()
          this.mensaje("Correcto !! ","Eliminado Correctamente")
        })
      }
    });
    
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
