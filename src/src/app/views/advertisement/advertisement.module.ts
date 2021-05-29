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
import { PagesContainersModule } from './../../containers/pages/pages.containers.module';
import { ComponentsCarouselModule } from './../../components/carousel/components.carousel.module';
import { LayoutContainersModule } from './../../containers/layout/layout.containers.module';
import { ComponentsCardsModule } from './../../components/cards/components.cards.module';
import { ComponentsChartModule } from './../../components/charts/components.charts.module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { HotkeyModule } from 'angular2-hotkeys';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ContextMenuModule } from 'ngx-contextmenu';
import { AdvertisementDetailsComponent } from './details/advertisement-details.component';
import { AdvertisementCreateComponent } from './create/advertisement-create.component';
import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementRoutingModule } from './advertisement.routing';

@NgModule({
  declarations: [
    AdvertisementComponent,
    AdvertisementCreateComponent,
    AdvertisementDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdvertisementRoutingModule,
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
export class AdvertisementModule {}
