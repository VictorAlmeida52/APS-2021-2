import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import GoTrue from 'gotrue-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = new GoTrue({
    APIUrl: 'https://aps20212.netlify.app/.netlify/identity',
    audience: '',
    setCookie: true,
  });

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) { }

  public async authenticate(username: string, password: string): Promise<any> {
    return await (this.http.post('http://localhost:8000/login', { username, password })).toPromise()
  }

  public async refreshToken(refreshToken: string): Promise<any> {
    return await (this.http.post('http://localhost:8000/token', { token: refreshToken })).toPromise()
  }

  public signup(username: string, password: string) {
    this.auth
    .signup(username, password)
    .then((response) => console.log('Confirmation email sent', response))
    .catch((error) => console.log("It's an error", error));
  }

  public login(username: string, password: string) {
    this.auth
    .login(username, password, true)
    .then((response) => {
      console.log(`Success! Response: ${JSON.stringify({ response })}`);
    })
    .catch((error) => console.log(`Failed :( ${JSON.stringify(error)}`));
  }

  public confirmEmail(token: string) {
    this.auth.confirm(token, true).catch(err => console.log(err))
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken')
    return token !== null && !this.jwtHelper.isTokenExpired(token)
  }

}
