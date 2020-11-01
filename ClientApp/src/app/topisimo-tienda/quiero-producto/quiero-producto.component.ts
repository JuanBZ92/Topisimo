import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuieroProducto } from '../galleria-detail/galleria-detail.component';

@Component({
  selector: 'app-quiero-producto',
  templateUrl: './quiero-producto.component.html',
  styleUrls: ['./quiero-producto.component.scss']
})
export class QuieroProductoComponent implements OnInit {

  @Input() quiero: QuieroProducto;
  
  quieroProductoForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) { 
    this._createForm();
  }

  ngOnInit() {
  }

  private _createForm(): void {
    this.quieroProductoForm = this._formBuilder.group({
      nombre: [''],
      telefono: [''],
      email: [''],
    });
  }

  sendEmail() {
    this.quiero.email = this.quieroProductoForm.controls['email'].value;
    this.quiero.nombre = this.quieroProductoForm.controls['nombre'].value;
    this.quiero.telefono = this.quieroProductoForm.controls['telefono'].value;
    this.activeModal.close(this.quiero);
  }

}
