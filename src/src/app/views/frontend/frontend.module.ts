import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendRoutingModule } from './frontend.routing';

import {
  FormsModule as FormsModuleAngular,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ArchwizardModule } from 'angular-archwizard';

import { SharedModule } from '../../shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ComponentsStateButtonModule } from '../../components/state-button/components.state-button.module';
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

import { FrontendComponent } from './frontend.component';
import { MainComponent } from './main.component';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { ChatService } from '../app/applications/chat/chat.service';
// import { ChatComponent } from ',/../app/applications/chat/chat.component';
// import { ModalConfirmComponent } from '../containers/ui/modals/modal-confirm/modal-confirm.component';

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
// import { LoginComponent } from "./views/auth/login/login.component";
// import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { FindTalentComponent } from './views/findTalent/find-talent.component';
//import { FindWorkComponent } from './views/findWork/find-work.component';



@NgModule({
  declarations: [
    MainComponent,
    FrontendComponent,

    FindTalentComponent,
    //FindWorkComponent,


    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    // LoginComponent,
    // RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
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
  providers: [AuthGuard, ChatService],
})
export class FrontendModule { }
