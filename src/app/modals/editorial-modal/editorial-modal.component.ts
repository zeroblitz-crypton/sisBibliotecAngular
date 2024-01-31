import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalsService } from '../../services/modals.service';
import Swal from 'sweetalert2';
import { EditorialService } from '../../services/editorial.service';

@Component({
  selector: 'app-editorial-modal',
  templateUrl: './editorial-modal.component.html',
  styleUrl: './editorial-modal.component.scss'
})
export class EditorialModalComponent {
  editorialForm:FormGroup
  isEdit=false
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private modalService:ModalsService,
    private editorialService:EditorialService
  ){
    this.editorialForm =this.fb.group({
      editorial:['',Validators.required]
    })
  }
  ngOnInit(){
    if(this.data){
      this.isEdit=true
      this.editorialForm.patchValue(this.data)
    }
  }


  closeModal(){
    this.modalService.closeModalEditorial()
  }
  guardar(){
    if(this.editorialForm.valid){
      if(this.isEdit){
        const nuevoEditorial={
          estado:this.data.estado,
          editorial:this.editorialForm.value.editorial,
          id:this.data.id
        }
        this.editorialService.updateEditorial(nuevoEditorial.id,nuevoEditorial).subscribe(data=>{
          this.closeModal()
        })
      }
      else{
        const nuevoEditorial={        
          editorial:this.editorialForm.value.editorial,       
        }
        this.editorialService.createEditorial(nuevoEditorial).subscribe(data=>{
          this.closeModal()
        })
      }
      this.mensaje("Genial !! ", "Guardado Correctamente")
    }
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
