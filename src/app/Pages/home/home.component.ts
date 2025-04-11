import { Component } from '@angular/core';
import { OutstandingComponent } from '../../Components/outstanding/outstanding.component';
import { ShowcategoriesComponent } from '../../Components/showcategories/showcategories.component';

@Component({
  selector: 'app-home',
  imports: [OutstandingComponent, ShowcategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
