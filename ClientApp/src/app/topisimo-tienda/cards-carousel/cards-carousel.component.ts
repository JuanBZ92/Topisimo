import { Component, Input, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.scss']
})
export class CardsCarouselComponent implements OnInit {

  @Input() images: string[] = [944, 1011, 984].map(n => `https://picsum.photos/id/${n}/900/500`);
  
  xleftCard: number = 0;
  leftCard: number = 1;
  centerCard: number = 2;
  rightCard: number = 3;
  xrightCard: number = 4;
  counter = 5;
  transition = false;
  transitionReverse = false;

  constructor() { }

  ngOnInit() {
  }

  nextCard() {
    this.transitionReverse = false;
    this.transition = true;
    this.counter += 1;
    if (this.counter === this.images.length) {
      this.xleftCard = 0;
      this.leftCard += 1;
      this.centerCard += 1;
      this.rightCard += 1;
      this.xrightCard += 1;  
    } else {
      this.xleftCard += 1;
      this.leftCard += 1;
      this.centerCard += 1;
      this.rightCard += 1;
      this.xrightCard += 1;  
    }
  }

  previousCard(){
    this.transition = false;
    this.transitionReverse = true;
    this.counter -= 1;
    if (this.counter === this.images.length) {
      this.xleftCard -= 0;
      this.leftCard -= 1;
      this.centerCard -= 1;
      this.rightCard -= 1;
      this.xrightCard -= 1;  
    } else {
      this.xleftCard -= 1;
      this.leftCard -= 1;
      this.centerCard -= 1;
      this.rightCard -= 1;
      this.xrightCard -= 1;  
    }

  }

}
