import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-myslider',
  imports: [NgFor],
  templateUrl: './myslider.component.html',
  styleUrl: './myslider.component.css'
})
export class MysliderComponent {
  @ViewChild('slider', { static: true }) slider!: ElementRef;
  list:number[] = [1,2,3,4,5,6,7,10];
  currentIndex: number = 0;
  interval:number = 0;
  dots:boolean = false;

  getTransform() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  updateSlider() {
    this.slider.nativeElement.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.list.length;
    this.updateSlider();
  }
}
