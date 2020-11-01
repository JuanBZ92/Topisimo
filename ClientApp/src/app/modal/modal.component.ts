import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuieroProducto } from 'src/app/topisimo-tienda/galleria-detail/galleria-detail.component';
import { QuieroProductoComponent } from 'src/app/topisimo-tienda/quiero-producto/quiero-producto.component';
import { AddPedidoComponent } from '../topisimo-admin/add-pedido/add-pedido.component';
import { Pedidos } from '../topisimo-admin/table-pedidos/table-pedidos.component';

@Component({
  selector: 'app-modal',
  template: ''
})
export class ModalComponent {
  @Output() guardarPedido = new EventEmitter<Pedidos>();
  @Output() quieroProducto = new EventEmitter<QuieroProducto>();
  isModalLoading: boolean;

  constructor(private modalService: NgbModal) {
    this.isModalLoading = false;
  }

  abrirAgregarPedido() {
    const modalRef = this.modalService.open(AddPedidoComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    //modalRef.componentInstance.clientId = this.clientId;

    modalRef.result
      .then(result => {
        // console.log(result); // do something with form data
        this.guardarPedido.emit(result);
      })
      .catch(error => {
        // console.log(error); // catch some potential error
      });
  }

  modalQuieroProducto() {
    const modalRef = this.modalService.open(QuieroProductoComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    //modalRef.componentInstance.quiero = quiero;

    modalRef.result
      .then(result => {
        // console.log(result); // do something with form data
        this.quieroProducto.emit(result);
      })
      .catch(error => {
        // console.log(error); // catch some potential error
      });
  }

}
