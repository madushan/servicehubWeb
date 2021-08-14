import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { LoginComponent } from "src/app/views/frontend/views/auth/login/login.component";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  bsModalRef: BsModalRef;

  config = {
    initialState: {
      agreement: null,
    },
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg',
    //class: 'modal-right'
  };

  constructor(private modalService: BsModalService) { }
  // constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    console.log('is authenticated');
    //const token = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('user');
    //return !this.jwtHelper.isTokenExpired(token);
    if(sessionToken){
      console.log(sessionToken);
      return true;
    }else{
      let loginResult = this.showLogin();
      console.log(loginResult);
    }
    return false;
  }

  showLogin() {
    this.config.initialState.agreement = null;
    this.bsModalRef = this.modalService.show(
      LoginComponent,
      this.config
    );
    //this.bsModalRef.content.project = new Project();
    this.bsModalRef.content.modalRef = this.bsModalRef;
    this.bsModalRef.content.event.subscribe((res) => {
      console.log(res);
      return true;
      // this.agreementService.add(res.data).subscribe((d) => {
      //   console.log(d);
      //   //this.data.push(res.data)
      // });
    },error => {
      console.log(error);
      return false;
    });
  }
}
