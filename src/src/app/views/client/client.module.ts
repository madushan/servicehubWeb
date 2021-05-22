import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as FormsModuleAngular } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';

import { SharedModule } from '../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ComponentsStateButtonModule } from '../../components/state-button/components.state-button.module';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client.routing';
import { ClientCreateComponent } from './create/client-create.component';

@NgModule({
  declarations: [
    ClientComponent,
    ClientCreateComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModuleAngular,
    TranslateModule,
    ArchwizardModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    ComponentsStateButtonModule
  ]
})
export class ClientModule { }
