import { Component, EventEmitter, OnInit } from '@angular/core';
import { LoginUserDTO } from './../../../../models/auth/loginUserDTO';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  loginForm: FormGroup;
  public modalRef: BsModalRef;
  loginDto: LoginUserDTO;

  constructor(
    private fb: FormBuilder,
    private notifications: NotificationsService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginDto = new LoginUserDTO();
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: '',
      password: '123',
      remeberMe: '',
    });
  }

  login() {
    if (this.authService.isLoggedIn()) {
      console.log('logged in');
      this.router.navigate(['/views/dashboard/dashboard']);
    } else {
      console.log('not logged in');
      console.log(this.loginForm.value);
      this.authService
        .login({
          userName: this.loginForm.value.userName,
          password: this.loginForm.value.password,
        })
        .subscribe((tk) => {
          console.log(tk);
          this.router.navigate(['/views/dashboard/dashboard']);
        });
    }

    this.modalRef.hide();
  }
}
