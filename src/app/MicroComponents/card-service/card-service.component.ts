import { Component, Input } from '@angular/core';
import { Service } from '../../Models/service';
import { Image } from '../../Models/image';

@Component({
  selector: 'app-card-service',
  imports: [],
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.css'
})
export class CardServiceComponent {
  @Input() service!:Service;
  @Input() images!:Image[];
  @Input() url!:string;
}
