import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalsService } from '../../services/modals.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstudiantesService } from '../../services/estudiantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes-modal',
  templateUrl: './estudiantes-modal.component.html',
  styleUrl: './estudiantes-modal.component.scss'
})
export class EstudiantesModalComponent {
  isEdit=false
  estudianteForm:FormGroup

  constructor(
    private modalService:ModalsService,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private estudianteService:EstudiantesService

  ){
    this.estudianteForm=this.fb.group({
      codigo:['',Validators.required],
      dni:['',Validators.required],
      nombre:['',Validators.required],
      carrera:['',Validators.required],
      telefono:['',Validators.required],
      direccion:['',Validators.required],
      estado:[''],
      id:['']
    })
  }

  ngOnInit(){
    if(this.data){
      this.isEdit=true
      console.log(this.data);      
      this.isEdit=true
      this.estudianteForm.patchValue(this.data)
    }
  }

  closeModal(){
    this.modalService.closeModalEstudiante()
  }
  guardar(){
    if(this.estudianteForm.valid){
      if(this.isEdit){
        this.estudianteService.updateEstudiante(this.estudianteForm.value.id,this.estudianteForm.value).subscribe(data=>{          
        })
      }else{       
        this.estudianteService.createEstudiante(this.estudianteForm.value).subscribe(data=>{
        })
      }
      this.mensaje("Bien !! ", "Se guardo correctamente")
      this.closeModal()
    }
  }
  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
