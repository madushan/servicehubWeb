import { Component, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { UserRegisterComponent } from "src/app/views/user/apiUser/register/user-register.component";
import { LoginComponent } from "src/app/views/user/apiUser/login/login.component";
import { AuthService } from "src/app/services";
import { BehaviorSubject, Observable, of } from "rxjs";

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;
  isLogedIn$ = new BehaviorSubject<boolean>(false);

  bsModalRef: BsModalRef;


  config = {
    initialState: {
      project: null,
      projectMode: 'add'
    },
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg',
    //class: 'modal-right'
  };

  constructor(private modalService: BsModalService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogedIn$.next(this.authService.isLoggedIn());
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  signUp() {


    console.log('signUp');
    this.config.initialState.project = null;
    this.config.class = 'modal-md';
    this.bsModalRef = this.modalService.show(
      UserRegisterComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;

    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      //this.editEntity(res);
    });

  }
  login() {


    console.log('login');
    this.config.initialState.project = null;
    this.config.class = 'modal-md';
    this.bsModalRef = this.modalService.show(
      LoginComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;

    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      //this.editEntity(res);
    });

  }
}
