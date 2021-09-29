import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherPageComponent } from './weather-page/weather-page.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: 'weather', component: WeatherPageComponent },
  { path: 'traffic', component: SideMenuComponent },
  { path: 'about', component: SideMenuComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
