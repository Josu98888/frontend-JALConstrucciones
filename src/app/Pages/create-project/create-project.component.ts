import { Component } from '@angular/core';
import { TitleComponent } from '../../MicroComponents/title/title.component';
import { ProjectCreateComponent } from '../../Components/project-create/project-create.component';

@Component({
  selector: 'app-create-project',
  imports: [TitleComponent, ProjectCreateComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

}
