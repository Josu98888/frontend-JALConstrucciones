import { Component } from '@angular/core';
import { OutstandingComponent } from '../../Components/outstanding/outstanding.component';

@Component({
  selector: 'app-home',
  imports: [OutstandingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
