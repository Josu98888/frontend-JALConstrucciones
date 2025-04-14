import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Service } from '../../services/serviceService';
import { ActivatedRoute } from '@angular/router';
import { CardDetailComponent } from "../../MicroComponents/card-detail/card-detail.component";

@Component({
  selector: 'app-service-detail',
  imports: [ CardDetailComponent],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent {
  public service:any;
  public images:any[]= [];
  public url:string;
  public status:string = '';

  constructor(
    private _service:Service,
    private _router:ActivatedRoute
  ) {
    this.url = environment.url;
  }

  ngOnInit() {
    this.getServiceDetail();
  }
  
  getServiceDetail() {
    this._router.params.subscribe((params) => {
      let id = +params['id'];

      this._service.getService(id).subscribe(
        response => {
          if(response.status == 'success') {
            this.service = response.service;
            this.images = response.service.images;
            this.status = 'success';
          }
        }, 
        error => {
          console.log(error);
          this.status = 'error';
        }
      );
    });
  }
}
