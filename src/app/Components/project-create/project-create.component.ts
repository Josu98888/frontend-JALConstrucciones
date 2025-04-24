import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-project-create',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
})
export class ProjectCreateComponent {
  @Output() formProject = new EventEmitter<any[]>();
  @Input() category_id: any;
  public form: any;
  public fileAvatars: File[] = [];
  public imagePreviews: (string | ArrayBuffer | null)[] = [];

  avatarUpload($event: any) {
    const files = Array.from($event.target.files).slice(0, 3) as File[]; // hasta 3
    this.fileAvatars = files;
    this.imagePreviews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.imagePreviews.push(reader.result);
      };
    });

    if ($event.target.files.length > 3) {
      alert('Solo se procesarán las primeras 3 imágenes.');
    }
  }
}
