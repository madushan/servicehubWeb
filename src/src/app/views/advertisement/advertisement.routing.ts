import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementCreateComponent } from './create/advertisement-create.component';
import { AdvertisementDetailsComponent } from './details/advertisement-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdvertisementComponent,
    children: [
      { path: '', redirectTo: 'advertisements', pathMatch: 'full' },
      { path: 'advertisements', component: AdvertisementComponent },
      { path: 'advertisementcreate', component: AdvertisementCreateComponent },
      {
        path: 'advertisementdetails',
        component: AdvertisementDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisementRoutingModule {}
