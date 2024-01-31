import { Component,NgModule } from '@angular/core';
import { MateriasService } from '../../services/materias.service';
import { ModalsService } from '../../services/modals.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.scss'
})
export class MateriasComponent {
  materias:any=[]
  auxMaterias:any=[]
  searchMateria:string=''
  data: any[] = [
    ['Nombre', 'Edad', 'Correo'],
    ['John Doe', 30, 'john.doe@example.com'],
    ['Jane Doe', 25, 'jane.doe@example.com']
  ];

  constructor(
    private modalService:ModalsService,
    private materiaService:MateriasService
  ){

  }
  ngOnInit(){
   this.listarMaterias()
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

    // Guardar el archivo Excel
    XLSX.writeFile(wb, 'reporte_materias.xlsx');
  }
  listarMaterias(){
    this.materiaService.getMaterias().subscribe(data=>{
      this.materias=data.materias
      this.auxMaterias=data.materias
      
    })
  }

  openModalMateria(materia:any){
    this.modalService.openModalMateria(materia)
    this.modalService.materiaModal?.afterClosed().subscribe(data=>{
      this.listarMaterias()
    })
  }

  EliminarMateria(id:any){
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
        this.materiaService.deleteMateria(id).subscribe(data=>{
          this.listarMaterias()
          this.mensaje("Bien!!","Eliminado correctamente")
        })
      }
    });
  }

  searchMaterias(){
    this.materias = this.auxMaterias.filter((prod:any)=> 
    prod.materia.toLowerCase().includes(this.searchMateria.toLowerCase())  
    
    ) 
  }

  mensaje(titulo:any,mensaje:any){
    Swal.fire(titulo,mensaje, 'success');
  }
}
