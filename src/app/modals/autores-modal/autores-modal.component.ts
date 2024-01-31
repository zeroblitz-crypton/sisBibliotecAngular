import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalsService } from '../../services/modals.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutoresService } from '../../services/autores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autores-modal',
  templateUrl: './autores-modal.component.html',
  styleUrl: './autores-modal.component.scss'
})
export class AutoresModalComponent {
  isEdit=false
  autorForm:FormGroup
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private modalService:ModalsService,
    private autorService:AutoresService
  )
  {
    this.autorForm =this.fb.group({
      autor:['',Validators.required]
    })
  }

  ngOnInit(){
    if(this.data){
      this.autorForm.patchValue(this.data)
      this.isEdit=true
    }
  }
  closeModal(){
    this.modalService.closeModalAutor()
  }
  guardar(){
    if(this.autorForm.valid){
      if(this.isEdit){
        const nuevoAutor={
          estado:this.data.estado,
          autor:this.autorForm.value.autor,
          id:this.data.id
        }
        this.autorService.updateAutor(nuevoAutor.id,nuevoAutor).subscribe(data=>{
          this.closeModal()
        })
      }
      else{
        const nuevoAutor={        
          autor:this.autorForm.value.autor,       
        }
        this.autorService.createAutor(nuevoAutor).subscribe(data=>{
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
