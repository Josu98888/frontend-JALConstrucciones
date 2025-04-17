import { Component } from '@angular/core';
import { CreateCategoryComponent } from '../../Components/create-category/create-category.component';

@Component({
  selector: 'app-categories',
  imports: [CreateCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
