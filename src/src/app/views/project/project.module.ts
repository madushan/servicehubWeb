import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as FormsModuleAngular } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';

import { SharedModule } from '../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ComponentsStateButtonModule } from '../../components/state-button/components.state-button.module';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project.routing';
import { ProjectCreateComponent } from './create/project-create.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectCreateComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModuleAngular,
    TranslateModule,
    ArchwizardModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    ComponentsStateButtonModule
  ]
})
export class ProjectModule { }
