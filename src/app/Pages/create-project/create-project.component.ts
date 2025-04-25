import { Component } from '@angular/core';
import { TitleComponent } from '../../MicroComponents/title/title.component';
import { ProjectCreateComponent } from '../../Components/project-create/project-create.component';
import { environment } from '../../../environments/environment.development';
import { Service } from '../../services/serviceService';
import { UserService } from '../../services/userService';
import { ImageService } from '../../services/imageService';

@Component({
  selector: 'app-create-project',
  imports: [TitleComponent, ProjectCreateComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css',
})
export class CreateProjectComponent {
  public url: string;
  public token: string;
  public status:string = '';

  constructor(
    private _serviceService: Service,
    private _userService: UserService,
    private _imageService:ImageService
  ) {
    this.url = environment.url;
    this.token = this._userService.getToken();
  }

  createProject(data: any) {
    const [form, formdata] = data;
    const jsonData = {
      json: JSON.stringify({
        ...form.value,
        outstanding: form.value.outstanding === 'true' ? 1 : 0,
      }),
    };
    this._serviceService.createService(this.token, jsonData).subscribe(
      (response) => {
        if (response.status == 'success') {
          const service_id = response.service.id;
          this.uploadServiceImages(formdata,service_id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  uploadServiceImages(formdata: FormData, service_id: number) {
    const files: File[] = formdata.getAll('image') as File[];
  
    if (files && files.length) {
      files.forEach((file: File) => {
        const singleImageFormData = new FormData();
        singleImageFormData.append('image', file);
        singleImageFormData.append('service_id', service_id.toString());
  
        this._imageService.createImage(this.token, singleImageFormData).subscribe(
          response => {
            if(response.status == 'success') {
              this.status = 'success';
              window.location.reload();
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
  
}
