import { CommonModule, NgClass, NgFor } from '@angular/common';                                 //para agregar o quitar clases CSS dinámicamente en un elemento HTML según condiciones en el componente.
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';                              //para  navegar entre rutas sin recargar la página.
import { CategoryService } from '../../services/categoryService';           // Servicio de la categoria
import { Router } from '@angular/router';                                //para navegar entre rutas sin recargar la página.
import { ViewportScroller } from '@angular/common';                //para desplazarse a una posición específica en la página.

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink, NgFor, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  public categories:any;
  public status!:string;
  public menuItems:boolean = false;
  public menuCategories:boolean = false;

  constructor(
    private _categoryService:CategoryService,
    private _router:Router,
    private _viewportScroller:ViewportScroller
  ) {
    this.categories = this.getCategories();
  }

  togleMenu() {
    this.menuItems = !this.menuItems;
  }

  goToContact() {
    this._router.navigate([''], { fragment: 'contactUs' }).then(() => {
      setTimeout(() => {
        this._viewportScroller.scrollToAnchor('contactUs');
      }, 0);
    });
  }

  togleCategories() {
    this.menuCategories = !this.menuCategories;
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
