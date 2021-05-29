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
import { AgreementComponent } from './agreement.component';
import { AgreementDetailsComponent } from './details/agreement-details.component';
import { AgreementCreateComponent } from './create/agreement-create.component';
import { AgreementRoutingModule } from './agreement.routing';
import { FormsContainersModule } from 'src/app/containers/forms/forms.containers.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AgreementComponent,
    AgreementCreateComponent,
    AgreementDetailsComponent,
  ],
  imports: [
    CommonModule,
    AgreementRoutingModule,
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
    FormsContainersModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
  ],
})
export class AgreementModule {}
