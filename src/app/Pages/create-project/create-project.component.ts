import { Component } from '@angular/core';
import { TitleComponent } from '../../MicroComponents/title/title.component';
import { ProjectCreateComponent } from '../../Components/project-create/project-create.component';
import { environment } from '../../../environments/environment.development';
import { Service } from '../../services/serviceService';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-create-project',
  imports: [TitleComponent, ProjectCreateComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css',
})
export class CreateProjectComponent {
  public url: string;
  public token: string;

  constructor(
    private _serviceService: Service,
    private _userService: UserService
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
          const id = response.service.id;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
