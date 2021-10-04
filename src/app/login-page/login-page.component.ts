import { Component, OnInit } from '@angular/core';
import { AuthProps } from '../models/auth-props';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public authProps = {
    username: '',
    password: ''
  }

  async log() {
    console.log(`Access token: ${localStorage.getItem('accessToken')}\nRefresh token: ${localStorage.getItem('refreshToken')}`);
  }

  validate(): void {
    console.log(this.authService.isAuthenticated())
  }

  async refresh() {
    const refreshToken = localStorage.getItem('refreshToken')
    const oldAccessToken = localStorage.getItem('accessToken')
    const token = refreshToken !== null && await this.authService.refreshToken(refreshToken)
    localStorage.setItem('accessToken', token.accessToken)
    console.log(`Old access token: ${oldAccessToken}\nNew access token: ${localStorage.getItem('accessToken')}`);
    
  }

  async login() {
    const tokens = await this.authService.authenticate()
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
