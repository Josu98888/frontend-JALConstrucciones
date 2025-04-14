import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-card-service',
  imports: [NgIf, TitleComponent],
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.css'
})
export class CardServiceComponent {
  @Input() service:any;
  @Input() image:any;
  @Input() url!:string;
  @Input() description:boolean = false;
}
