import { Component } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.scss'
})
export class LibrosComponent {
  libros:any=[]
  auxlibros:any=[]
  constructor(
    private libroService:LibroService,
    private modalService:ModalsService
  ){

  }
  ngOnInit(){
    this.listarLibros()
  }

  listarLibros(){
    this.libroService.getLibros().subscribe(data=>{
      this.libros=data.libros
      this.auxlibros=data.libros
    })
  }

  openModal(libro:any){
    this.modalService.openModalLibro(libro)
    this.modalService.libroModal?.afterClosed().subscribe(data=>{
      this.listarLibros()
    })
  }

  eliminarLibro(id:any){

  }
}
