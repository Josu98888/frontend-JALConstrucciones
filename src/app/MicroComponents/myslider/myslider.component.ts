import { NgFor } from '@angular/common';
import { Component, ContentChildren, ElementRef, QueryList, ViewChild} from '@angular/core';

@Component({
  selector: 'app-myslider',
  imports: [],
  templateUrl: './myslider.component.html',
  styleUrl: './myslider.component.css'
})
export class MysliderComponent {
  @ViewChild('slider', { static: true }) slider!: ElementRef;
  @ContentChildren('slideItem') slideItems!: QueryList<ElementRef>;
  currentIndex: number = 0;
  interval:number = 0;
  dots:boolean = false;

  getTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  updateSlider() {
    if (this.slider?.nativeElement) {
      this.slider.nativeElement.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
  }  

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slideItems.length ) % this.slideItems.length;
    this.updateSlider();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slideItems.length;
    this.updateSlider();
  }
}
