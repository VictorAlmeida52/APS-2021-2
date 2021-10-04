import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {SidebarModule} from 'primeng/sidebar';
import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {SkeletonModule} from 'primeng/skeleton';
import {InputTextModule} from 'primeng/inputtext';
import {DividerModule} from 'primeng/divider';
import {PasswordModule} from 'primeng/password';
import {TableModule} from 'primeng/table';
import {GMapModule} from 'primeng/gmap';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {RippleModule} from 'primeng/ripple';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';


import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { QueimadasPageComponent } from './queimadas-page/queimadas-page.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    WeatherPageComponent,
    SideMenuComponent,
    LoginPageComponent,
    QueimadasPageComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    ToastModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule,
    AppRoutingModule,
    AccordionModule,
    SidebarModule,
    ButtonModule,
    SkeletonModule,
    InputTextModule,
    DividerModule,
    PasswordModule,
    TableModule,
    CheckboxModule,
    RippleModule,
    GMapModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
