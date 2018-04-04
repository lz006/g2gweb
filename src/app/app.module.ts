import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from './utils/alert/alert.module';
import { UserService } from './shared/services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { AppConfig } from './app-config';
import { ApiRequestService } from './shared/services/api-request.service';
import { LoginComponent } from './login/login.component';
import { ToasterModule } from 'angular2-toaster';
import { AlertComponent } from './utils/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from './shared/guard/auth.guard';
// import { BrowserModule } from '@angular/platform-browser';

import {MatFormFieldModule} from '@angular/material/form-field';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatInputModule, MatCardModule, MatButtonModule, MatRadioModule, MatSliderModule } from '@angular/material';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  // for development
  // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    AlertModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    ApiRequestService,
    AuthenticationService,
    UserService,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
