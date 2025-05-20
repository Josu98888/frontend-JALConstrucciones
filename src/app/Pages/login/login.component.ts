import { Component } from '@angular/core';
import { TitleComponent } from '../../MicroComponents/title/title.component';
import { UserService } from '../../services/userService';
import { environment } from '../../../environments/environment.development';
import { User } from '../../Models/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [TitleComponent, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public user!: User;
  public loginForm: any;
  public url: string;
  public status: string = '';

  constructor(private _userService: UserService, private _router: Router) {
    this.url = environment.url;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit(): void {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this._userService.login(user, true).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this._userService.saveSession(response.user, response.token);
          this.status = 'success';
          setTimeout(() => {
            this._router.navigate(['']).then(() => {
              window.location.reload();
            });
          }, 3000);
        } else {
          this.status = 'error';
        }
      },
      error: (err) => {
        // console.error(err);
        this.status = 'error';
        if (err.error?.errors?.email) {
          this.loginForm.get('email')?.setErrors({ emailTaken: true });
        }
        if (err.status === 401) {
          this.loginForm.get('password')?.setErrors({ invalidPassword: true });
        }
      },
    });
  }
}
