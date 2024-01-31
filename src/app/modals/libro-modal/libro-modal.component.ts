import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'app-libro-modal',
  templateUrl: './libro-modal.component.html',
  styleUrl: './libro-modal.component.scss'
})
export class LibroModalComponent {
  isEdit=false
  libroForm:FormGroup

  constructor(
    private fb:FormBuilder,
    private modalService:ModalsService
  ){
    this.libroForm =this.fb.group({
      editorial:['',Validators.required]
    })
  }

  closeModal(){
    this.modalService.closeModalLibro()
  }
  guardar(){

  }
}
