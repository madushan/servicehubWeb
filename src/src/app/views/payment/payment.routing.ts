import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentCreateComponent } from './create/payment-create.component';
import { PaymentDetailsComponent } from './details/payment-details.component';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    children: [
      { path: '', redirectTo: 'payments', pathMatch: 'full' },
      { path: 'payments', component: PaymentComponent },
      { path: 'paymentcreate', component: PaymentCreateComponent },
      {
        path: 'paymentdetails',
        component: PaymentDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
