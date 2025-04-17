import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-category',
  imports: [NgIf],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  @Input() title:string = 'Creá una categoría';
  @Input() edit:boolean = false;
  @Input() categories:any;
  @Input() image:any;
  @Input() imagePreview:any;
  @Input() url:any;
  @Input() onSubmit!: () => void;

  
}
