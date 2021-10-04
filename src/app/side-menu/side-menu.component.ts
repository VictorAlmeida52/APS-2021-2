import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  
  public showSidebar: boolean = false
  public items: MenuItem[] = new Array<MenuItem>();
  public authenticated: boolean

  log(): void {
    console.log(this.showSidebar);
  }

  login() {
    this.router.navigate(['login']);
  }

  profile() {
    console.log('Redirected to profile')
  }

  constructor(public router: Router, private authservice: AuthService) {
    this.authenticated = this.authservice.isAuthenticated()
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Previsão do Tempo',
        routerLink: 'weather'
      },
      {
        label: 'Trânsito',
        routerLink: 'traffic'
      },
      {
        label: 'Queimadas',
        routerLink: 'queimadas'
      },
      {
        label: 'Sobre',
        routerLink: 'about'
      },
    ];
  }

}
