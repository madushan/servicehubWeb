import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule as FormsModuleAngular,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';

import { SharedModule } from '../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ComponentsStateButtonModule } from '../../components/state-button/components.state-button.module';
import { PagesContainersModule } from '../../containers/pages/pages.containers.module';
import { ComponentsCarouselModule } from '../../components/carousel/components.carousel.module';
import { LayoutContainersModule } from '../../containers/layout/layout.containers.module';
import { ComponentsCardsModule } from '../../components/cards/components.cards.module';
import { ComponentsChartModule } from '../../components/charts/components.charts.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { HotkeyModule } from 'angular2-hotkeys';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ContextMenuModule } from 'ngx-contextmenu';

import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AgmCoreModule } from '@agm/core';
import { YaCoreModule } from 'yamapng';
import { YamapngModule } from 'yamapng';
import { SortablejsModule } from 'ngx-sortablejs';
import { BootstrapModule } from '../../components/bootstrap/bootstrap.module';
import { UiModalsContainersModule } from '../../containers/ui/modals/ui.modals.containers.module';
import { ComponentsRoutingModule } from '../app/ui/components/components.routing';
import { ViewsModule } from '../views.module';
import { CommonComponentModule } from './../components/common-components.module';

import { UserComponent } from './user.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserRoutingModule } from './user.routing';
import { UserRegisterComponent } from './apiUser/register/user-register.component';
import { AuthService } from 'src/app/services';
import { LoginComponent } from './apiUser/login/login.component';

@NgModule({
  declarations: [
    UserComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserRegisterComponent,
    LoginComponent
  ],
  imports: [
    // CommonModule,
    UserRoutingModule,
    // FormsModule,
    // SharedModule,
    // SimpleNotificationsModule.forRoot(),
    // ComponentsStateButtonModule,

    CommonModule,
    PagesContainersModule,
    FormsModuleAngular,
    TranslateModule,
    ArchwizardModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    ComponentsStateButtonModule,
    ComponentsCarouselModule,
    LayoutContainersModule,
    ComponentsCardsModule,
    ComponentsChartModule,
    RatingModule.forRoot(),
    ReactiveFormsModule,
    HotkeyModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),

    ComponentsRoutingModule,
    FormsModule,
    UiModalsContainersModule,
    QuillModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCO8MfadmlotuuHC8wmjwL_46I5QAMIiRU',
    }),
    YamapngModule,
    YaCoreModule.forRoot({ apiKey: '658f67a2-fd77-42e9-b99e-2bd48c4ccad4' }),
    SortablejsModule,
    BootstrapModule,
  ],
  providers: [
    AuthService
  ],
  entryComponents: [
    UserRegisterComponent,
    LoginComponent
  ]
})
export class UserModule { }
