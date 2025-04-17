import { Component } from '@angular/core';
import { CreateCategoryComponent } from '../../Components/create-category/create-category.component';
import { MysliderComponent } from '../../MicroComponents/myslider/myslider.component';
import { CardServiceComponent } from '../../MicroComponents/card-service/card-service.component';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/categoryService';
import { environment } from '../../../environments/environment.development';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CreateCategoryComponent, MysliderComponent, CardServiceComponent, RouterLink, NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  public categories:any;
  public url:string;
  public status:string = '';

  constructor(
    private _categoryService:CategoryService
  ) {
    this.url = environment.url;
  }

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success') {
          this.categories = response.categories;
          this.status = 'success';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

}
