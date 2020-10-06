import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { InsideModule } from './inside-routing/inside.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorsModule } from './core/errors';

import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppConfig } from './services/appconfig.service';
import { ErrorLoginComponent } from './error-login/error-login.component';

import { CommonDataService } from './services/common-data.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InsideModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ErrorsModule,
    MalihuScrollbarModule.forRoot(),
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true },
  CommonDataService,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function initConfig(config: AppConfig) { return () => config.load() }
