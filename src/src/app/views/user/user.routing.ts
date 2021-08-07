import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UserComponent },
      // { path: '', redirectTo: 'login', pathMatch: 'full' },
      // { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
      // { path: 'forgot-password', component: ForgotPasswordComponent },
      // { path: 'reset-password', component: ResetPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
