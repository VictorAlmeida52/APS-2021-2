import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public router: string

  public showSideMenu: boolean = false

  constructor(private _router: Router, private primengConfig: PrimeNGConfig){
    this.router = _router.url
    _router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        console.log(val.url);
        if(val.url !== '/login'){
          this.showSideMenu = true
        } else {
          this.showSideMenu = false
        }
      }
    })
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }


  title = 'aps-frontend';
}
