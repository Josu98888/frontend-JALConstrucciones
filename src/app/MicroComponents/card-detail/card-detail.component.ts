import { Component, Input } from '@angular/core';
import { MysliderComponent } from '../myslider/myslider.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-card-detail',
  imports: [MysliderComponent, NgFor, NgIf],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent {
  @Input() public service:any;
  @Input() public images:any;
  @Input() public url!:string;

}
