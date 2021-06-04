import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './../views.routing';
import { SharedModule } from './../../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ComponentsCarouselModule } from './../../components/carousel/components.carousel.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadroomModule } from '@ctrl/ngx-headroom';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
// import { ChatService } from './app/applications/chat/chat.service';
// import { ChatComponent } from './app/applications/chat/chat.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [ModalConfirmComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    ComponentsCarouselModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    HeadroomModule,
    ScrollToModule.forRoot(),
    // LayoutContainersModule,
  ],
  providers: [],
})
export class CommonComponentModule {}
