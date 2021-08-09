import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()

export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    console.log('is authenticated');
    //const token = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    //return !this.jwtHelper.isTokenExpired(token);
    return true;
  }
}
