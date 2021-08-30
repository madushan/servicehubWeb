import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }
  // async canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Promise<boolean> {
  //   const currentUser =  this.authService.currentUser;

  //   if (currentUser) {
  //     if (route.data && route.data.roles) {
  //       if (route.data.roles.includes(currentUser.role)) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/unauthorized']);
  //         return false;
  //       }
  //     } else {
  //       return true;
  //     }
  //   } else {
  //     this.router.navigate(['/user/login']);
  //     return false;
  //   }
  // }
  // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
  //   const currentUser = await this.authService.getUser();

  //   if (currentUser) {
  //     if (route.data && route.data.roles) {
  //       if (route.data.roles.includes(currentUser.role)) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/unauthorized']);
  //         return false;
  //       }
  //     } else {
  //       return true;
  //     }
  //   } else {
  //     this.router.navigate(['/user/login']);
  //     return false;
  //   }
  // }
}
