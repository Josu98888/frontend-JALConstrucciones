import { Component, ContentChildren, ElementRef, QueryList, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-myslider',
  imports: [],
  templateUrl: './myslider.component.html',
  styleUrl: './myslider.component.css'
})
export class MysliderComponent implements AfterViewInit {
  @ViewChild('slider', { static: true }) slider!: ElementRef;
  @ContentChildren('slideItem') slideItems!: QueryList<ElementRef>;
  currentIndex: number = 0;
  interval:number = 5000;
  dots:boolean = false;
   autoSlideInterval:any;


  ngAfterViewInit() {
    this.startAutoSlide(); // inicia el autoplay al renderizar
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, this.interval);
  }

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
