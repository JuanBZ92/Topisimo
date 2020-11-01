import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private config: NgbCarouselConfig) { 
        config.interval = 5000;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = true;
  }

  ngOnInit() {
  }

}
