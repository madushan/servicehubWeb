import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgreementComponent } from './agreement.component';
import { AgreementCreateComponent } from './create/agreement-create.component';
import { AgreementDetailsComponent } from './details/agreement-details.component';

const routes: Routes = [
  {
    path: '',
    component: AgreementComponent,
    children: [
      { path: '', redirectTo: 'agreements', pathMatch: 'full' },
      { path: 'agreements', component: AgreementComponent },
      { path: 'agreementcreate', component: AgreementCreateComponent },
      {
        path: 'agreementdetails',
        component: AgreementDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementRoutingModule {}
