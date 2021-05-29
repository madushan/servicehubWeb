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
import { PaymentDetailsComponent } from './details/payment-details.component';
import { PaymentCreateComponent } from './create/payment-create.component';
import { PaymentRoutingModule } from './payment.routing';
import { ComponentsModule } from '../app/ui/components/components.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentCreateComponent,
    PaymentDetailsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PaymentRoutingModule,
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
  ],
})
export class PaymentModule {}
