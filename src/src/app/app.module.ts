import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';

import { ProjectService } from './services/project.service';
import { AdvertisementService } from './services/advertisement.service';
import { AgreementService } from './services/agreement.service';
import { PaymentService } from './services/payment.service';
import { FrontendModule } from './views/frontend/frontend.module';
import { UserModule } from './views/user/user.module';
import { AuthInterceptor } from './services/auth/auth-intercepter';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  imports: [
    BrowserModule,
    ViewsModule,
    FrontendModule,
    UserModule,
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
    //JwtHelperService,
    PaymentService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
