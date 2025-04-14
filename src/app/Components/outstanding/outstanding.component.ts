import { Component } from '@angular/core';
import { Service } from '../../services/serviceService';
import { environment } from '../../../environments/environment.development';
import { CardServiceComponent } from '../../MicroComponents/card-service/card-service.component';
import { NgFor } from '@angular/common';
import { MysliderComponent } from '../../MicroComponents/myslider/myslider.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-outstanding',
  imports: [NgFor, CardServiceComponent, MysliderComponent, RouterLink],
  templateUrl: './outstanding.component.html',
  styleUrl: './outstanding.component.css'
})
export class OutstandingComponent {
  public outstanding:any;
  public status!:string;
  public url:string;

  constructor(
    private _service:Service
  ) {
    this.url = environment.url;
  }

  ngOnInit() {
    this.getOutstanding();
  }

  getOutstanding() {
    this._service.getOutstanding().subscribe(
      response => {
        console.log(response);
        if(response.status == 'success') {
          this.outstanding = response.services;
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
