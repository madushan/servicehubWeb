import { EventEmitter, Input, OnInit } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { User } from 'src/app/models';
import { ApiUser } from 'src/app/models/auth/apiUser';
import { AuthService, ProjectService, UserService } from '../../../services';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
})
export class UserCreateComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();

  public modalRef: BsModalRef;
  @Input() public user:User;
  @Input() public userMode: string;

  projectFormGroup: FormGroup;

  //user$: Observable<Project>;
  apiUser: ApiUser;


  constructor(private fb: FormBuilder,
    private notifications: NotificationsService,
    private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.projectFormGroup = this.createFormGroup();
    if (this.user) {
      this.projectFormGroup.patchValue(this.user);
    }
  }

  createFormGroup() {
    return this.fb.group({
      //name: '',
      address: '',
      identityPhoto: '',
      //contacts: '',
      //userAreas: '',
      //socialMedias: '',
      providerIntroduction: '',
      //skills: '',
      expertiseLevel: '',
      //portfolios: '',
      //educations: '',
      currentEmployment: '',
      hourlyRate: '',
      //agreements: '',
      //projects: ''

      ////API User specific
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
    if (this.projectFormGroup.value.password == this.projectFormGroup.value.confirmPassword) {
      this.apiUser.password = this.projectFormGroup.value.password;
    }
    else {
      return;
    }

    this.apiUser.email = this.projectFormGroup.value.email;
    this.apiUser.firstName = this.projectFormGroup.value.firstName;
    this.apiUser.lastName = this.projectFormGroup.value.lastName;
    this.apiUser.userName = this.projectFormGroup.value.userName;
    this.apiUser.phoneNumber = this.projectFormGroup.value.phoneNumber;

    this.apiUser.roles.push('Admin');// = ['Admin'];

    this.authService.register(this.apiUser).subscribe(
      res => { console.log(res);
    },
      err => console.log(err)
    );

    ////////// User

    this.user.name = this.projectFormGroup.value.firstName + this.projectFormGroup.value.lastName;
    this.user.address = this.projectFormGroup.value.address;
    this.user.providerIntroduction = this.projectFormGroup.value.providerIntroduction;
    this.user.expertiseLevel = this.projectFormGroup.value.expertiseLevel;
    this.user.currentEmployment = this.projectFormGroup.value.currentEmployment;
    this.user.hourlyRate = this.projectFormGroup.value.hourlyRate;

    if (this.userMode == 'add') {
      this.userService.add(this.user).subscribe(
        d => {
          console.log(d);
          this.notifications.create('Successfull', this.user.name + ' added successfully', NotificationType.Success,
            { theClass: 'outline primary', timeOut: 6000, showProgressBar: true })
        },
        e => console.log(e)
      );
    } else {
      this.userService.update(this.user).subscribe(
        d => {
          console.log(d);
          this.notifications.create('Successfull', this.user.name + ' updated successfully', NotificationType.Bare,
            { theClass: 'outline primary', timeOut: 6000, showProgressBar: true })
        },
        e => console.log(e)
      );
    }
    this.modalRef.hide();
  }
}
