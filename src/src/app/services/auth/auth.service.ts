import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from "moment";
//import { moment } from "ngx-bootstrap/chronos/test/chain";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { LoginUserDTO } from "src/app/models/auth/loginUserDTO";
import { environment } from "src/environments/environment";
import { BaseService } from "../baseService.service";
import { ApiUser } from './../../models/auth/apiUser';


const API_URL = environment.webApiUrl + '/account';
const helper = new JwtHelperService();

@Injectable()

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<ApiUser>;
  public currentUser: Observable<ApiUser>;

  constructor(public http: HttpClient,
    //public jwtHelper: JwtHelperService
  ) {
    //super(http, API_URL);

    this.currentUserSubject = new BehaviorSubject<ApiUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  //constructor(public jwtHelper: JwtHelperService) { }

  public get currentUserValue(): ApiUser {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    console.log('is authenticated');
    //const token = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('user');
    //return !this.jwtHelper.isTokenExpired(token);
    if (sessionToken) {
      console.log(sessionToken);
      return true;
    } else {
      // let loginResult = this.showLogin();
      // console.log(loginResult);
    }
    return false;
  }

  // showLogin() {
  //   this.config.initialState.agreement = null;
  //   this.bsModalRef = this.modalService.show(
  //     LoginComponent,
  //     this.config
  //   );
  //   //this.bsModalRef.content.project = new Project();
  //   this.bsModalRef.content.modalRef = this.bsModalRef;
  //   this.bsModalRef.content.event.subscribe((res) => {
  //     console.log(res);
  //     return true;
  //     // this.agreementService.add(res.data).subscribe((d) => {
  //     //   console.log(d);
  //     //   //this.data.push(res.data)
  //     // });
  //   },error => {
  //     console.log(error);
  //     return false;
  //   });
  // }

  public register(user: ApiUser): Observable<any> {
    //console.log(entity);
    //console.log(this.apiUrl);
    return this.http.post<ApiUser>(API_URL + '/register', user);
  }

  public login(loginDto: LoginUserDTO) {
    console.log(loginDto);
    //debugger;
    return this.http.post<LoginUserDTO>(API_URL + '/login', loginDto)
      .pipe(
        tap(res => this.setSession(res))
      )
    // .pipe(map(user => {
    //   // store user details and jwt token in local storage to keep user logged in between page refreshes
    //   //localStorage.setItem('currentUser', JSON.stringify(user));
    //   //this.currentUserSubject.next(user);
    //   //return user;
    // }));
  }
  private setSession(authResult) {
    console.log(authResult);
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    console.log(localStorage.getItem('id_token'));
  }
  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem("expires_at");
    this.currentUserSubject.next(null);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
  getCurretUser() {
    let token = localStorage.getItem('id_token');
    //console.log(token);
    let userProf = helper.decodeToken(token);
    //let userProf = this.jwtHelper.decodeToken(token);
    //console.log(userProf);
    return userProf;//JSON.parse(userProf);
  }
}
