import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../services/categoryService';

@Component({
  selector: 'app-project-create',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
})

export class ProjectCreateComponent {
  @Output() formProject = new EventEmitter<any[]>();
  public categories:any;
  public form: any;
  public fileAvatars: File[] = [];
  public imagePreviews: (string | ArrayBuffer | null)[] = [];

  constructor(
    private _categoryService: CategoryService
  ) {

  }
  ngOnInit() {
    this.getCategories();
    this.form = new FormGroup({
      category_id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      outstanding: new FormControl('', Validators.required),
    });
  }

  emitForm() {
    const formData = new FormData();
    if (this.fileAvatars) {
      this.fileAvatars.forEach((file) => {
        formData.append('image', file);
      });
    }
    console.log(this.form.value);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    this.formProject.emit([this.form, formData]);
  }

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

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success') {
          this.categories = response.categories;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
