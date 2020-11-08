import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TopisimoService } from 'src/app/service/topisimo.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuieroProductoComponent } from '../quiero-producto/quiero-producto.component';

export interface Productos {
  modelo: string;
  path: string;
  anio: number;
  partes: number;
  conjunto: boolean;
  imagePaths: string[];
  description: string;
}

export interface QuieroProducto { 
  modelo: string;
  anio: string;
  telefono: string;
  nombre: string;
  email: string;
  taza: string;
  talle: string;
}

@Component({
  selector: 'app-galleria-detail',
  templateUrl: './galleria-detail.component.html',
  styleUrls: ['./galleria-detail.component.scss']
})
export class GalleriaDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', { static: false }) modal: ModalComponent;

  @Input() imagesPosta: Productos[];
  images: string[] = [944, 1011, 984, 983, 985, 1012, 1013].map(n => `https://picsum.photos/id/${n}/900/500`);
  data: any = [];
  subData: any = [];
  size: string;
  medidas: string;
  mouseDown = false;
  originalPos = 0;
  value = 0;
  actualValue = 0;
  container: Element;
  nombre: string;
  material: number;
  descripcion: string;
  maxmove: number;
  isLoading = true;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private cdRef : ChangeDetectorRef, private topisimoService: TopisimoService, private modalService: NgbModal) {
  }

  moveSlider(event: any) {
    if (this.mouseDown) {
      event.preventDefault();
      this.value = ((this.originalPos - event.clientX) / 10) + this.actualValue;
      let test = document.querySelector(".p-galleria-thumbnail-items");
      this.value = this.value > 0 ? 0 : this.value < this.maxmove ? this.maxmove : this.value;
      test.setAttribute("style", "transform: translate3d(" + this.value + "%, 0px, 0px);")
      console.log(this.value);
    }
  }

  mainImage(data: any) {
    console.log(data);
    let mainImageImage = document.querySelector('#mainImageImage');
    mainImageImage.setAttribute('src', data.previewImageSrc);
  }

  changeGroup(event: any) {
    let index = this.imagesPosta.findIndex(x => x.modelo === event.title);
    this.nombre = this.imagesPosta[index].modelo;
    this.material = this.imagesPosta[index].anio;
    this.subData = {
      data: this.imagesPosta[index].imagePaths.map(x => new Object({
        previewImageSrc: x.split('dist')[1],
        thumbnailImageSrc: x.split('dist')[1],
        alt: this.imagesPosta[index].anio,
        title: this.imagesPosta[index].modelo
      }))
    }
  }

  ngOnInit() {
    console.log(this.imagesPosta[0].imagePaths.filter(x => x.includes('fondo')));
    this.data = {
      data: this.imagesPosta.map(x => new Object({
        previewImageSrc: x.imagePaths.find(x => x.includes('fondo')).split('dist')[1],
        thumbnailImageSrc: x.imagePaths.find(x => x.includes('fondo')).split('dist')[1],
        alt: x.anio,
        description: x.description,
        title: x.modelo
      }))
    };

    this.subData = {
      data: this.imagesPosta[0].imagePaths.map(x => new Object({
        previewImageSrc: x.split('dist')[1],
        thumbnailImageSrc: x.split('dist')[1],
        alt: this.imagesPosta[0].anio,
        description: this.imagesPosta[0].description,
        title: this.imagesPosta[0].modelo
      }))
    }
    this.nombre = this.imagesPosta[0].modelo;
    this.material = this.imagesPosta[0].anio;
    this.descripcion = this.imagesPosta[0].description;
    this.maxmove = (((150 * this.data.data.length) * 100) / 1200) * -1;
    console.log(this.maxmove);
  }

  ngAfterViewInit() {

  }

  sendEmail(item: any) {
    let producto: QuieroProducto = {
      modelo: item.title,
      anio: item.alt.toString(),
      telefono: '',
      nombre: '',
      email: '',
      taza: this.medidas,
      talle: this.size
    };
    const modalRef = this.modalService.open(QuieroProductoComponent, { centered: true, backdrop: 'static', size: 'lg' });
    modalRef.componentInstance.quiero = producto;
    modalRef.result
      .then(result => {
        this.topisimoService.sendEmail(producto).subscribe();
      })
      .catch(error => {
        // console.log(error);
      });
  }
  
  imageLoaded(event: any) {
    this.isLoading = false;
    this.cdRef.detectChanges();
    //setTimeout(x => {
      this.container = document.querySelector(".p-galleria-thumbnail-wrapper");
      this.container.addEventListener("mousedown", (event: any) => { this.mouseDown = true; this.originalPos = event.x });
      this.container.addEventListener("mousemove", (event) => this.moveSlider(event));
      this.container.addEventListener("mouseup", () => { this.mouseDown = false; this.actualValue = this.value; console.log(this.actualValue) });  
    //}, 2000);
    this.nombre = event.title;
    this.material = event.alt;
    this.descripcion = event.description;
  }

  // ngAfterViewChecked() {
  //   let show = this.isLoading;
  //   if (show != this.isLoading) { // check if it change, tell CD update view
  //     this.show = show;
  //   }
  // }


}
