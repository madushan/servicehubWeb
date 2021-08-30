import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiUser } from '../../../../models/auth/apiUser';
// import { Project } from '../../../models/project';
import { AuthService } from '../../../../services';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
})
export class UserRegisterComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();

  public modalRef: BsModalRef;
  // @Input() public project: Project;
  // @Input() public projectMode: string;

  registerFormGroup: FormGroup;

  apiUser$: Observable<ApiUser>;
  apiUser: ApiUser;

  constructor(private fb: FormBuilder,
    private notifications: NotificationsService,
    private authService: AuthService) {
    this.apiUser = new ApiUser();
  }

  ngOnInit() {
    this.registerFormGroup = this.createFormGroup();

    // if (this.project) {
    //   this.projectFormGroup.patchValue(this.project);
    // }
  }

  createFormGroup() {
    return this.fb.group({
      userName: '',
      password: '',
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    });
  }

  saveUser() {

    if (this.registerFormGroup.value.password == this.registerFormGroup.value.confirmPassword) {
      this.apiUser.password = this.registerFormGroup.value.password;
    }
    else {
      return;
    }

    this.apiUser.email = this.registerFormGroup.value.email;
    this.apiUser.firstName = this.registerFormGroup.value.firstName;
    this.apiUser.lastName = this.registerFormGroup.value.lastName;
    this.apiUser.userName = this.registerFormGroup.value.userName;
    this.apiUser.phoneNumber = this.registerFormGroup.value.phoneNumber;

    this.apiUser.roles.push('Admin');// = ['Admin'];

    console.log(this.apiUser);

    this.authService.register(this.apiUser).subscribe(res => {
      console.log(res);
      this.notifications.create('Successfull', this.apiUser.firstName + ' added successfully', NotificationType.Success,
        { theClass: 'outline primary', timeOut: 6000, showProgressBar: true })
    },
      err => console.log(err));

    this.modalRef.hide();
  }
}
