import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalsService } from '../../services/modals.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-modal',
  templateUrl: './usuarios-modal.component.html',
  styleUrl: './usuarios-modal.component.scss'
})
export class UsuariosModalComponent {
  isEdit=false
  usuarioForm:FormGroup

  constructor(
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private modalService:ModalsService,
    private usuarioService:UsuariosService
  ){
    this.usuarioForm=this.fb.group({
      usuario:['',Validators.required],
      nombre:['',Validators.required],
      clave:['',Validators.required],
      clave2:['',Validators.required],      
      id:[''],
      estado:['']
    })
  }

  ngOnInit(){
    if(this.data){
      console.log(this.data);
      
      this.isEdit=true
      this.usuarioForm.patchValue(this.data)
      this.usuarioForm.get('clave')?.setValue('')
    }
  }

  closeModal(){
    this.modalService.closeModalUsuario()
  }

  guardar(){
    if(this.usuarioForm.valid){
      if(this.usuarioForm.value.clave==this.usuarioForm.value.clave2){
        if(this.isEdit){
          this.usuarioService.updateUsuario(this.usuarioForm.value.id,this.usuarioForm.value).subscribe(data=>{
  
          })
        }
        else{
          this.usuarioService.createUsuario(this.usuarioForm.value).subscribe(data=>{
  
          })
        }
        this.mensaje("Genial !!", "Se guardo correctamente")
        this.closeModal()
      }
      else{
        Swal.fire("Sucedio Algo","Las claves no son iguales", 'warning');
      }
    }
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
