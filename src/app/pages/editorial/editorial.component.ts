import { Component } from '@angular/core';
import { EditorialService } from '../../services/editorial.service';
import { ModalsService } from '../../services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrl: './editorial.component.scss'
})
export class EditorialComponent {
  editoriales:any=[]
  auxeditoriales:any=[]
  searchEditorial=""
  constructor(
    private editorialesService:EditorialService,
    private modalService:ModalsService
  ){}

  ngOnInit(){
    this.listarEditorial()
  }

  listarEditorial(){
    this.editorialesService.getEditoriales().subscribe(data=>{
      this.editoriales=data.editoriales
      this.auxeditoriales=data.editoriales
    })
  }

  openModal(autor:any){
    this.modalService.openModalEditorial(autor)
    this.modalService.editorialModal?.afterClosed().subscribe(data=>{
      this.listarEditorial()
    })
  }
  eliminiarEditorial(id:any){
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
        this.editorialesService.deleteEditorial(id).subscribe(data=>{
          this.listarEditorial()
          this.mensaje("Bien!!","Eliminado correctamente")
        })
      }
    });
  }
  searchEditoriales(){
    this.editoriales = this.auxeditoriales.filter((prod:any)=> 
    prod.editorial.toLowerCase().includes(this.searchEditorial.toLowerCase())  
    
    ) 
  }
  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
