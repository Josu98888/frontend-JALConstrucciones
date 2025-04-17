import { Component } from '@angular/core';
import { UserService } from '../../services/userService';
import { environment } from '../../../environments/environment.development';
import { TitleComponent } from '../../MicroComponents/title/title.component';

@Component({
  selector: 'app-admin',
  imports: [TitleComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  public identity:any;
  public url:string;

  constructor(
    private _userService:UserService
  ) {
    this.url = environment.url;
    this.identity = _userService.getIdentity();
  }
}
