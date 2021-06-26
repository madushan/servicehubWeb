import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';

import { ProjectService } from './services/project.service';
import { AdvertisementService } from './services/advertisement.service';
import { AgreementService } from './services/agreement.service';
import { PaymentService } from './services/payment.service';
import { FrontendModule } from './views/frontend/frontend.module';

@NgModule({
  imports: [
    BrowserModule,
    ViewsModule,
    FrontendModule,
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [AppComponent],
  providers: [
    ProjectService,
    AdvertisementService,
    AgreementService,
    PaymentService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
