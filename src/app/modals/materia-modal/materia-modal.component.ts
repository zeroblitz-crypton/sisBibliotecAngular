import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalsService } from '../../services/modals.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriasService } from '../../services/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia-modal',
  templateUrl: './materia-modal.component.html',
  styleUrl: './materia-modal.component.scss'
})
export class MateriaModalComponent {
  isEdit=false
  materiaForm:FormGroup
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private modalService:ModalsService,
    private materiaServices:MateriasService
  ){
    this.materiaForm=this.fb.group({
      materia:['',Validators.required]
    })
  }
  ngOnInit(){
    if(this.data){
      this.isEdit=true
      this.materiaForm.patchValue(this.data)
    }
    
  }

  guardar(){
   if(this.materiaForm.valid){
    if(this.isEdit){
      const nuevaMateria={
        estado:this.data.estado,
        materia:this.materiaForm.value.materia,
        id:this.data.id
      }
      this.materiaServices.updateMateria(nuevaMateria.id,nuevaMateria).subscribe(data=>{
        this.closeModal()
      })
    }
    else{
      const nuevaMateria={        
        materia:this.materiaForm.value.materia,       
      }
      this.materiaServices.createMateria(nuevaMateria).subscribe(data=>{
        this.closeModal()
      })
    }
    this.mensaje("Genial !! ", "Guardado Correctamente")
   }
  }

  closeModal(){
    this.modalService.closeModalMateria()
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
