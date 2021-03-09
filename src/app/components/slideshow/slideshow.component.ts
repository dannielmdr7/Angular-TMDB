import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';



import Swiper from 'swiper/bundle';



@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];
  public swiper: Swiper;

  constructor() { }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      // Optional parameters
      slidesPerView: 1,
      loop: true
    });

  }

  ngOnInit(): void {

  }

  onNextClick() {
    this.swiper.slideNext();

  }

  onPrevClick() {
    this.swiper.slidePrev();

  }



}
