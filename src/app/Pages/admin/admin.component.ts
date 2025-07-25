import { Component } from '@angular/core';
import { UserService } from '../../services/userService';
import { environment } from '../../../environments/environment.development';
import { TitleComponent } from '../../MicroComponents/title/title.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [TitleComponent, ReactiveFormsModule, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  public identity:any;
  public token:any;
  public url:string;
  public formUpdateUser:any;
  public fileAvatar:any;
  public imagePreview:any;
  public status:string = '';

  constructor(
    private _userService:UserService,
    private _router:Router
  ) {
    this.url = environment.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
  }

  ngOnInit() {
    this.formUpdateUser = new FormGroup({
      name: new FormControl(this.identity.name, Validators.required),
      lastname: new FormControl(this.identity.lastname, Validators.required),
      email: new FormControl(this.identity.email, [Validators.required, Validators.email]),
      current_password: new FormControl('', [Validators.minLength(8)]),
      password: new FormControl('', [Validators.minLength(8)]),
    });
  }

  onSubmit() {
    const formData = new FormData();
  
    formData.append('name', this.formUpdateUser.get('name').value);
    formData.append('lastname', this.formUpdateUser.get('lastname').value);
    formData.append('email', this.formUpdateUser.get('email').value);
    formData.append('current_password', this.formUpdateUser.get('current_password').value);
    formData.append('password', this.formUpdateUser.get('password').value);
  
    if (this.fileAvatar) {
      formData.append('image', this.fileAvatar);
    }
  
    this._userService.update(formData, this.token).subscribe(
      (response) => {
        if (response && response.status == 'success') {
          this.status = 'success';
          this.identity = { ...this.identity, ...this.formUpdateUser.value };
          if (response.user && response.user.image) {
            this.identity.image = response.user.image;
          }
          this._userService.saveSession(this.identity, this.token);
          setTimeout(() => {
            this._router.navigate(['admin']).then(() => {
              window.location.reload();
            });
          }, 3000);
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        if (error.error?.errors?.email) {
          this.formUpdateUser.get('email')?.setErrors({ emailTaken: true });
        }
        if (error.error.message.includes('La contraseña actual no es correcta.')) {
          this.formUpdateUser.get('current_password')?.setErrors({ incorrectPassword: true });
        }
        console.log(error);
      }
    );
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
