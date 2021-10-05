import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthProps } from '../models/auth-props';
import { AuthService } from '../services/auth.service';
import GoTrue from 'gotrue-js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public confirmation_token = ''
  private auth = new GoTrue({
    APIUrl: 'https://aps20212.netlify.app/.netlify/identity',
    audience: '',
    setCookie: false,
  });

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

  signup() {
    this.auth
    .signup('victor.almeida2410@gmail.com', 'Selens@01')
    .then((response) => console.log('Confirmation email sent', response))
    .catch((error) => console.log("It's an error", error));
  }

  async login2() {
    try {
      const tokens = await this.authService.authenticate(this.authProps.username, this.authProps.password)
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Usuário autenticado com sucesso'});
    } catch (error) {
      this.messageService.add({severity:'error', summary: 'Acesso negado', detail: 'Usuário ou senha incorretos'});
    }
  }

  login() {
    this.auth
    .login(this.authProps.username, this.authProps.password, true)
    .then((response) => {
      console.log(`Success! Response: ${JSON.stringify({ response })}`);
    })
    .catch((error) => console.log(`Failed :( ${JSON.stringify(error)}`));
  }

  constructor(private authService: AuthService, private messageService: MessageService, private route: ActivatedRoute) {
    this.route.fragment.subscribe(fragment => {
      console.log(fragment)
    })
  }

  ngOnInit(): void {
  }

}
