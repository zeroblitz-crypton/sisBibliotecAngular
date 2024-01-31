import { Component } from '@angular/core';
import { AutoresService } from '../../services/autores.service';
import { ModalsService } from '../../services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrl: './autor.component.scss'
})
export class AutorComponent {
  autores:any=[]
  auxautores:any=[]
  searchAutor=""
  constructor(
    private autoresService:AutoresService,
    private modalService:ModalsService
  ){

  }

  ngOnInit(){
    this.listarAutores()
  }

  listarAutores(){
    this.autoresService.getAutores().subscribe(data=>{
      this.autores=data.autores
      this.auxautores=data.autores
      console.log(data);
      
    })
  }

  openModal(autor:any){
    this.modalService.openModalAutor(autor);
    this.modalService.autorModal?.afterClosed().subscribe(data=>{
      this.listarAutores()
    })
  }
  eliminarAutor(id:any){
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
        this.autoresService.deleteAutor(id).subscribe(data=>{
          this.listarAutores()
          this.mensaje("Bien!!","Eliminado correctamente")
        })
      }
    });
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
  searchAutores(){
    this.autores = this.auxautores.filter((prod:any)=> 
    prod.autor.toLowerCase().includes(this.searchAutor.toLowerCase())  
    
    ) 
  }
}
