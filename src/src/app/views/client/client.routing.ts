import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientCreateComponent } from './create/client-create.component';


const routes: Routes = [
    {
        path: '', component: ClientComponent,
        children: [
            { path: '', redirectTo: 'clients', pathMatch: 'full' },
            { path: 'clients', component: ClientComponent },
            { path: 'clientcreate', component:ClientCreateComponent }
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
export class ClientRoutingModule { }
