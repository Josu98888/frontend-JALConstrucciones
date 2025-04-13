import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../../services/serviceService';
import { CardServiceComponent } from '../../MicroComponents/card-service/card-service.component';
import { environment } from '../../../environments/environment.development';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-servicesbycategory',
  imports: [CardServiceComponent, NgFor],
  templateUrl: './servicesbycategory.component.html',
  styleUrl: './servicesbycategory.component.css'
})
export class ServicesbycategoryComponent {
  status:string = '';
  services:any = [];
  title:string = '';
  url:string;

  constructor(
    private _route:ActivatedRoute,
    private service: Service
  ){
    this.url = environment.url;
  }

  ngOnInit() {
    this.getServicesByCategory();
  }

  getServicesByCategory() {
    this._route.params.subscribe((params) => {
      let id = +params['id'];

      this.service.getServicesByCategory(id).subscribe(
        response => {
          if(response.status == 'success') {
            this.services = response.services;
            this.title = response.category;
            this.status = 'success';
          }
        }, 
        error => {
          console.log(error);
          this.status = 'error';
        }
      );
    }
    );
  }
}
