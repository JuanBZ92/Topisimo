import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct, NgbTypeahead, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TopisimoService } from '../../service/topisimo.service';
import { Pedidos } from '../table-pedidos/table-pedidos.component';

export interface Estado {
  value: number,
  viewValue: string
}
@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.css']
})
export class AddPedidoComponent implements OnInit {
  agregarPedidoForm: FormGroup;
  estados: Estado[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private topisimoService: TopisimoService
  ) {
    this.estados = [
      { value: 1, viewValue: 'No Pagado' },
      { value: 2, viewValue: 'Pagado' },
    ];
    this._createForm();
  }

  private _createForm(): void {
    this.agregarPedidoForm = this._formBuilder.group({
      id: [''],
      fecha: [''],
      cliente: [''],
      modelo: [''],
      color: [''],
      peso: [''],
      costo: [''],
      busto: [''],
      bajoBusto: [''],
      tasa: [''],
      cintura: [''],
      precio: [''],
      estado: [''],
      notas: [''],
    });
  }


  ngOnInit() {
  }

  guardarPedido() {
    const request: Pedidos = {
      id: 0,
      fecha: new Date(this.agregarPedidoForm.controls['fecha'].value),
      cliente: this.agregarPedidoForm.controls['cliente'].value,
      modelo: this.agregarPedidoForm.controls['modelo'].value,
      color: this.agregarPedidoForm.controls['color'].value,
      peso: +this.agregarPedidoForm.controls['peso'].value ? +this.agregarPedidoForm.controls['peso'].value : 0,
      costo: this.agregarPedidoForm.controls['costo'].value ? +this.agregarPedidoForm.controls['costo'].value : 0,
      busto: this.agregarPedidoForm.controls['busto'].value ? +this.agregarPedidoForm.controls['busto'].value : 0,
      bajoBusto: this.agregarPedidoForm.controls['bajoBusto'].value ? +this.agregarPedidoForm.controls['bajoBusto'].value : 0,
      tasa: this.agregarPedidoForm.controls['tasa'].value ? +this.agregarPedidoForm.controls['tasa'].value : 0,
      cintura: this.agregarPedidoForm.controls['cintura'].value ? +this.agregarPedidoForm.controls['cintura'].value : 0,
      precio: this.agregarPedidoForm.controls['precio'].value ? +this.agregarPedidoForm.controls['precio'].value : 0,
      estado: this.agregarPedidoForm.controls['estado'].value,
      notas: this.agregarPedidoForm.controls['notas'].value,
    };
    this.topisimoService.guardarPedido(request).subscribe();
  }

}
