import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherPageComponent } from './weather-page/weather-page.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { QueimadasPageComponent } from './queimadas-page/queimadas-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomePageComponent } from './home-page/home-page.component';
import { AcidentesPageComponent } from './acidentes-page/acidentes-page.component';

const routes: Routes = [
  { path: 'weather', component: WeatherPageComponent, canActivate: [AuthGuardService] },
  { path: 'acidentes', component: AcidentesPageComponent, canActivate: [AuthGuardService] },
  { path: 'queimadas', component: QueimadasPageComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: SideMenuComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginPageComponent,},
  { path: '', component: HomePageComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
