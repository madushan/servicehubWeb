import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './../error/error.component';
import { UnauthorizedComponent } from './../unauthorized/unauthorized.component';
import { environment } from './../../../environments/environment';
// import { HomeComponent } from './home/home.component';
// import { AuthGuard } from '../shared/auth.guard';
// import { UserRole } from '../shared/auth.roles';
import { FrontendComponent } from './frontend.component';
import { MainComponent } from './main.component';
import { UserRole } from 'src/app/shared/auth.roles';
import { AuthGuard } from 'src/app/shared/auth.guard';

const adminRoot = environment.adminRoot.substr(1); // path cannot start with a slash

let routes: Routes = [
  {
    path: 'main',
    component: FrontendComponent,
    children: [
      {
        path: '',
        redirectTo: 'mainpage',
        pathMatch: 'full',
      },
      //   {
      //     path: adminRoot,
      //     loadChildren: () =>
      //       import('./../app/app.module').then((m) => m.AppModule),
      //     data: { roles: [UserRole.Admin, UserRole.Editor] },
      //     canActivate: [AuthGuard],
      //     canActivateChild: [AuthGuard],
      //   },
      { path: 'mainpage', component: MainComponent },
      { path: 'error', component: ErrorComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: '**', redirectTo: 'mainpage' },
    ],
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];

// if (!environment.isAuthGuardActive) {
//   routes = [
//     {
//       path: '',
//       component: HomeComponent,
//       pathMatch: 'full',
//     },
//     {
//       path: 'app',
//       loadChildren: () => import('./app/app.module').then((m) => m.AppModule),
//     },
//     {
//       path: 'user',
//       loadChildren: () =>
//         import('./user/user.module').then((m) => m.UserModule),
//     },
//     { path: 'error', component: ErrorComponent },
//     { path: '**', redirectTo: '/error' },
//   ];
// }
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontendRoutingModule {
  /**
   *
   */
  constructor() {
    console.log('FrontendRoutingModule');
  }
}
