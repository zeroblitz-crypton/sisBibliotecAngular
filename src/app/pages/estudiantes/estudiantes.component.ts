import { Component } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service';
import { ModalsService } from '../../services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})
export class EstudiantesComponent {
  estudiantes:any=[]
  auxEstudiantes:any=[]
  searchEstudiante=""
  constructor(
    private estudianteService:EstudiantesService,
    private modalService:ModalsService
  ){

  }
  ngOnInit(){
    this.listarEstudiantes()
  }

  listarEstudiantes(){
    this.estudianteService.getEstudiantes().subscribe(data=>{
      this.estudiantes=data.estudiantes
      this.auxEstudiantes=data.estudiantes
      
    })
  }

  openModal(estudiante:any){
    this.modalService.openModalEstudiante(estudiante)
    this.modalService.estudianteModal?.afterClosed().subscribe(data=>{
      this.listarEstudiantes()
    })
  }

  eliminarEstudiante(id:any){    
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
        this.estudianteService.deleteEstudiante(id).subscribe(data=>{
          this.listarEstudiantes()
          this.mensaje("Bien !! ","Se Elimino Correctamente")
        })
      }
    });
  }

  searchEstudiantes(){
    this.estudiantes = this.auxEstudiantes.filter((prod:any)=> 
    prod.nombre.toLowerCase().includes(this.searchEstudiante.toLowerCase()) || 
    prod.dni.toLowerCase().includes(this.searchEstudiante.toLowerCase()) ||
    prod.carrera.toLowerCase().includes(this.searchEstudiante.toLowerCase()) ||
    prod.direccion.toLowerCase().includes(this.searchEstudiante.toLowerCase()) ||
    prod.telefono.toLowerCase().includes(this.searchEstudiante.toLowerCase()) ||
    prod.codigo.toLowerCase().includes(this.searchEstudiante.toLowerCase()) 
    ) 
  }
  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }

}
