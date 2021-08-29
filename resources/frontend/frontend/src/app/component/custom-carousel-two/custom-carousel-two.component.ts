import { environment } from 'src/environments/environment';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-carousel-two',
  templateUrl: './custom-carousel-two.component.html',
  styleUrls: ['./custom-carousel-two.component.scss']
})
export class CustomCarouselTwoComponent implements OnInit {
  @Input() images:any[];
  @Output() imageEmitter = new EventEmitter<string>();
  environment = environment;

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "dots": true,
    "autoplay" : true,
    "autoplaySpeed" : 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }

  slickInit(e) {
  }

  changeSelectedImage(image:string){
    this.imageEmitter.emit(image);
  }



}
