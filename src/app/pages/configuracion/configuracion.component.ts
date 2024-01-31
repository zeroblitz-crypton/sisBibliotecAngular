import { Component } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss'
})
export class ConfiguracionComponent {
  configuracionForm:FormGroup

  constructor(
    private fb:FormBuilder,
    private configuracionService:ConfiguracionService
  ){
    this.configuracionForm=this.fb.group({
      id:['',Validators.required],
      nombre:['',Validators.required],
      telefono:['',Validators.required],
      correo:['',Validators.required],
      direccion:['',Validators.required],
    })
  }

  ngOnInit(){
    this.configuracionService.getConfiguracion().subscribe(data=>{
      this.configuracionForm.patchValue(data.configuracion)
    })
  }

  guardar(){
    if(this.configuracionForm.valid){
      this.configuracionService.updateConfiguracion(this.configuracionForm.value.id,this.configuracionForm.value).subscribe(data=>{
        this.mensaje("Genial !!","Se Guardaron los cambios")
      })
    }
  }
  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }

}
