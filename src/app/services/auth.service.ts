import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) { }

  public async authenticate(username: string, password: string): Promise<any> {
    return await (this.http.post('http://localhost:8000/login', { username, password })).toPromise()
  }

  public async refreshToken(refreshToken: string): Promise<any> {
    return await (this.http.post('http://localhost:8000/token', { token: refreshToken })).toPromise()
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken')
    return token !== null && !this.jwtHelper.isTokenExpired(token)
  }

}
