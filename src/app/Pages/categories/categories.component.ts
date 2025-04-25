import { Component } from '@angular/core';
import { CreateCategoryComponent } from '../../Components/create-category/create-category.component';
import { MysliderComponent } from '../../MicroComponents/myslider/myslider.component';
import { CardServiceComponent } from '../../MicroComponents/card-service/card-service.component';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/categoryService';
import { environment } from '../../../environments/environment.development';
import { NgFor } from '@angular/common';
import { TitleComponent } from '../../MicroComponents/title/title.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-categories',
  imports: [CreateCategoryComponent, MysliderComponent, CardServiceComponent, RouterLink, NgFor, TitleComponent, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  public categories:any;
  public url:string;
  public status:string = '';
  public formDelete:any;
  public token:string;

  constructor(
    private _categoryService:CategoryService,
    private _userService:UserService
  ) {
    this.url = environment.url;
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getCategories()
    this.formDelete = new FormGroup({
      categorieDelete: new FormControl('')
    });
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

  deleteCategory() {
    let idCategory = this.formDelete.value?.categorieDelete;
    this._categoryService.delete(this.token, idCategory).subscribe(
      response => {
        if(response.status == 'success') {
          this.status = 'success';
          window.location.reload();
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  createCategory(formData: FormData) {
    console.log('Form recibido:', formData);
  
    this._categoryService.create(this.token, formData).subscribe(
      response => {
        if(response.status == 'success') {
          this.status = 'success';
          window.location.reload();
        }
      },
      error => {
        console.error('Error al crear categoría', error);
        this.status = 'error';
      }
    );
  }

}
