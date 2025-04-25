import { Component, Input } from '@angular/core';
import { MysliderComponent } from '../myslider/myslider.component';
import { NgFor, NgIf } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { UserService } from '../../services/userService';
import { Service } from '../../services/serviceService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-detail',
  imports: [MysliderComponent, NgFor, NgIf, TitleComponent],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent {
  @Input() public service:any;
  @Input() public images:any;
  @Input() public url!:string;
  public identity:any;
  public token:string;
  public status:string = '';

  constructor(
    private _userService:UserService,
    private _serviceService:Service,
    private _router:Router
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  delete() {
    this._serviceService.deleteService(this.token, this.service.id).subscribe(
      response => {
        if(response.status == 'success') {
          this.status = 'success';
          this._router.navigate(['']);
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }
}
