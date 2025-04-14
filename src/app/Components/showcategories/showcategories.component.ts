import { Component } from '@angular/core';
import { MysliderComponent } from '../../MicroComponents/myslider/myslider.component';
import { Category } from '../../Models/category';
import { environment } from '../../../environments/environment.development';
import { CategoryService } from '../../services/categoryService';
import { CardServiceComponent } from '../../MicroComponents/card-service/card-service.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TitleComponent } from '../../MicroComponents/title/title.component';

@Component({
  selector: 'app-showcategories',
  imports: [MysliderComponent, CardServiceComponent, NgFor, RouterLink, TitleComponent],
  templateUrl: './showcategories.component.html',
  styleUrl: './showcategories.component.css'
})
export class ShowcategoriesComponent {
  public categories:Category[]= [];
  public url:string;
  public status:string = '';

  constructor(
    public _categoryService:CategoryService
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
