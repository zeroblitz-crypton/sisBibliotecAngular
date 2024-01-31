import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalsService } from '../../services/modals.service';
import { PermisosService } from '../../services/permisos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permiso-modal',
  templateUrl: './permiso-modal.component.html',
  styleUrl: './permiso-modal.component.scss'
})
export class PermisoModalComponent {
  permisos:any
  detallePermisos: any;
  permisosPorUsuario:any
  permisosSeleccionados: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: ModalsService,
    private permisoService: PermisosService
) { }

ngOnInit(){
  this.listarPermisos()
}



listarPermisos(){
  console.log(this.data);
  
  this.permisoService.getPermisos().subscribe(data=>{
    this.permisos=data.permisos
   
  })
  this.permisoService.getDetallePermisos(this.data).subscribe(data => {
  
    this.detallePermisos = data.detalle_permisos;
    this.permisosPorUsuario=data.detalle_permisos;
    this.permisosSeleccionados = this.detallePermisos.map((detalle: any) => detalle.id_permiso);          
});
}

togglePermission(permisoId: number): void {
  const index = this.permisosSeleccionados.indexOf(permisoId);
  if (index === -1) {
      this.permisosSeleccionados.push(permisoId);
  } else {
      this.permisosSeleccionados.splice(index, 1);
  }
}

hasPermission(permisoId: number): boolean {
  return this.permisosSeleccionados.includes(permisoId);
}

closeModal(){
  this.modalService.closeModalPermiso()
}

guardarPermisos(){
  const nuevoDetallePerm = this.permisosSeleccionados.map((per: any) => ({
    id_permiso: per,
    id_usuario: this.data
  }));
  if(this.permisosPorUsuario.length>0){
    this.permisoService.actualizarDetallesPermisos(nuevoDetallePerm,this.data).subscribe(data=>{

    })
  }
  else{
    this.permisoService.guardarDetallesPermisos(nuevoDetallePerm).subscribe(data=>{
      
    })
  }
  this.mensaje("Todo bien !! ","Guardado Correctamente")
  this.closeModal();
}

mensaje(titulo:any,mensaje:any){
  Swal.fire(titulo,mensaje, 'success');
}
}
