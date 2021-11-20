import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthProps } from '../models/auth-props';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public confirmation_token = ''

  public authProps = {
    username: '',
    password: ''
  }

  validate(): void {
    console.log(this.authService.isAuthenticated())
  }

  refresh() {
    this.authService.refreshToken()
  }

  signup() {
    this.authService.signup(this.authProps.username, this.authProps.password)
  }

  signout() {
    this.authService.signout()
  }

  async login() {
    const result = await this.authService.login(this.authProps.username, this.authProps.password)
    if(result.accessToken) {
      this.router.navigate(['/'])
    } else {
      this.messageService.add({severity:'error', summary: 'Acesso negado', detail: 'Usuário ou senha incorretos'});
    }
  }

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
    if(authService.isAuthenticated()){
      console.log('oi');

      router.navigate(['/'])
    }
  }

  ngOnInit(): void {
  }

}
