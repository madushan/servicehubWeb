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
import { ProjectRoutingModule } from './project.routing';
import { ProjectCreateComponent } from './create/project-create.component';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { ComponentsChartModule } from 'src/app/components/charts/components.charts.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { HotkeyModule } from 'angular2-hotkeys';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ProjectComponent } from './project.component';
import { ProjectDetailsComponent } from './details/project-details.component';

import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AgmCoreModule } from '@agm/core';
import { YaCoreModule } from 'yamapng';
import { YamapngModule } from 'yamapng';
import { SortablejsModule } from 'ngx-sortablejs';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { UiCardsContainersModule } from 'src/app/containers/ui/cards/ui.cards.containers.module';
import { UiModalsContainersModule } from 'src/app/containers/ui/modals/ui.modals.containers.module';
import { ComponentsRoutingModule } from '../app/ui/components/components.routing';
import { ViewsModule } from '../views.module';
import { CommonComponentModule } from './../components/common-components.module';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectCreateComponent,
    ProjectDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
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
    //CommonComponentModule,
  ],
})
export class ProjectModule {}
