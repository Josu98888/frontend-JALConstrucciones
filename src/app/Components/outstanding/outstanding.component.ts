import { Component , OnInit} from '@angular/core';
import { Service } from '../../services/serviceService';
import { NgFor } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-outstanding',
  imports: [NgFor],
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
