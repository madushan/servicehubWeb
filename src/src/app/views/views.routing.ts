import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth.guard';
import { UserRole } from '../shared/auth.roles';

const adminRoot = environment.adminRoot.substr(1); // path cannot start with a slash

let routes: Routes = [
  {
    path: 'views',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'project',
        pathMatch: 'full',
        // component: HomeComponent,
        // pathMatch: 'full',
      },
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: adminRoot
      // },
      {
        path: adminRoot,
        loadChildren: () => import('./app/app.module').then((m) => m.AppModule),
        data: { roles: [UserRole.Admin, UserRole.Editor] },
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      //   {
      //     path: 'main',
      //     loadChildren: () =>
      //       import('./frontend/frontend.module').then((m) => m.FrontendModule),
      //   },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      // {
      //   path: 'client',
      //   loadChildren: () =>
      //     import('./client/client.module').then((m) => m.ClientModule),
      // },
      {
        path: 'advertisement',
        loadChildren: () =>
          import('./advertisement/advertisement.module').then(
            (m) => m.AdvertisementModule
          ),
      },
      {
        path: 'agreement',
        loadChildren: () =>
          import('./agreement/agreement.module').then((m) => m.AgreementModule),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./payment/payment.module').then((m) => m.PaymentModule),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('./project/project.module').then((m) => m.ProjectModule),
      },
      {
        path: 'work',
        loadChildren: () =>
          import('./work/work.module').then((m) => m.WorkModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      { path: 'error', component: ErrorComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: '**', redirectTo: '/error' },
    ],
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
export class ViewRoutingModule { }
