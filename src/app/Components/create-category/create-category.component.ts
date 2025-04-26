import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  @Input() edit:boolean = false;
  @Output() formCategory = new EventEmitter<any>(); 
  public form:any;
  public fileAvatar:any;
  public imagePreview:any;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  emitForm() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    if (this.fileAvatar) {
      formData.append('image', this.fileAvatar);
    }
  
    console.log(this.form.value);
    console.log(this.fileAvatar);
    this.formCategory.emit(formData);
  }

  avatarUpload($event: any) {
    if($event.target.files.length > 0){
      this.fileAvatar = $event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileAvatar);
      reader.onloadend = () => this.imagePreview = reader.result;
    }       
  }

  
}
