import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from '../project/project.component';
import { WorkCreateComponent } from './create/work-create.component';
import { WorkDetailsComponent } from './details/work-details.component';
import { WorkComponent } from './work.component';

const routes: Routes = [
  {
    path: '',
    component: WorkComponent,
    children: [
      { path: '', redirectTo: 'works', pathMatch: 'full' },
      { path: 'works', component: WorkComponent },
      { path: 'workcreate', component: WorkCreateComponent },
      { path: 'workdetails', component: WorkDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkRoutingModule { }
