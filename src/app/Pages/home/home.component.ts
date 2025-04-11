import { Component } from '@angular/core';
import { OutstandingComponent } from '../../Components/outstanding/outstanding.component';
import { ShowcategoriesComponent } from '../../Components/showcategories/showcategories.component';
import { WhychooseusComponent } from '../../Components/whychooseus/whychooseus.component';

@Component({
  selector: 'app-home',
  imports: [OutstandingComponent, ShowcategoriesComponent, WhychooseusComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
