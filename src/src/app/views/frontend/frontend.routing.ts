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


// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
// import { LoginComponent } from "./views/auth/login/login.component";
// import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

import { CanActivate } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth-guard.service';

const adminRoot = environment.adminRoot.substr(1); // path cannot start with a slash

let routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  // {
  //   path: "auth",
  //   component: AuthComponent,
  //   children: [
  //     { path: "login", component: LoginComponent },
  //     { path: "register", component: RegisterComponent },
  //     { path: "", redirectTo: "login", pathMatch: "full" },
  //   ],
  // },

  // no layout views
  { path: "profile", component: ProfileComponent },
  //{ path: "landing", component: LandingComponent },

  //old components
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
    component: LandingComponent,
    //redirectTo: 'main',
    pathMatch: 'full',
  },

  // no layout views
  //{ path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
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
