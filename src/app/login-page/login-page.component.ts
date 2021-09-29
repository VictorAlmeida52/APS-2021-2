import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Login } from '../models/login';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  private refreshUrl: string = 'http://localhost:8080/auth/realms/APS/protocol/openid-connect/token'
  public props: any = {
    client_id: 'aps-auth',
    client_secret: '10b7ea08-4528-4312-865d-9e5757ef68e6',
    username: '',
    password: ''
  }

  refreshToken(): void {
    const data = `client_id=${this.props.client_id}&grant_type=refresh_token&refresh_token=${sessionStorage.getItem('keycloak-refresh-token') || this.props.refresh_token}&client_secret=${this.props.client_secret}`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;


    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        const response = JSON.parse(this.responseText)
        sessionStorage.setItem('keycloak-refresh-token', response.refresh_token)
        sessionStorage.setItem('keycloak-access-token', response.access_token)
        console.log(response.refresh_token + ' - ' + this.status);
        if(this.status != 200){
          console.log(response);
          console.log("Não foi possível atualizar o token");
        }
      }
    });

    xhr.open("POST", this.refreshUrl);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    try {
      xhr.send(data);
    } catch (error) {
      console.log('Erroooooo');
      console.log(error);
    }
  }

  login(): void {
    const data = `client_id=${this.props.client_id}&grant_type=password&client_secret=${this.props.client_secret}&scope=openid&username=${this.props.username}&password=${this.props.password}`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        const response = JSON.parse(this.responseText)
        sessionStorage.setItem('keycloak-refresh-token', response.refresh_token)
        sessionStorage.setItem('keycloak-access-token', response.access_token)
        console.log(response.refresh_token + ' - ' + this.status);
        if(this.status != 200){
          console.log(response);
          throw new Error("Não foi possível fazer o login");
        }
      }
    });

    xhr.open("POST", "http://localhost:8080/auth/realms/APS/protocol/openid-connect/token");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    try {
      xhr.send(data);
    } catch (error) {
      console.log('Erroooooo');
      console.log(error);
    }
  }

  auth(): void {
    const params: Login = {
      client_id: 'aps-auth',
      grant_type: 'password',
      client_secret: '58dae9fe-f3cb-4bce-8973-a630dc73903b',
      scope: 'openid',
      username: 'aps-user',
      password: 'Unip@2021'
    }
    this.loginService.auth(params).subscribe(() => {
      console.log('opa');
    })
  }
  
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

}
