import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) { }

  public async login(username: string, password: string) {
    const promise = (this.http.post('http://localhost:8000/login', { username, password })).toPromise()
    let result = await Promise.resolve(promise).catch((err: any) => err)
    localStorage.setItem('accessToken', result.accessToken)
    localStorage.setItem('refreshToken', result.refreshToken)
    return result
  }


  public async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken !== null){
      const promise = (this.http.post('http://localhost:8000/token', { token: refreshToken })).toPromise()
      let result = await Promise.resolve(promise).catch((err: any) => err)
      localStorage.setItem('accessToken', result.accessToken)
    }
  }

  public async signup(username: string, password: string) {
    const promise = (this.http.post('http://localhost:8000/users', { username, password })).toPromise()
    let result = await Promise.resolve(promise).catch((err: any) => err)
    console.log(result);
    return result
  }

  public signout() {
    let token = localStorage.getItem('refreshToken')
    token !== null && Promise.resolve((this.http.request('delete', 'http://localhost:8000/logout', { body: { token } })).toPromise())
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  public isAuthenticated(): boolean {
    try {
      let token = localStorage.getItem('accessToken')
      if(token !== null){
        let expired = this.jwtHelper.isTokenExpired(token)
        if (!expired) return true
        console.log('Estava expirado')
        this.refreshToken()
        return true
      } else {
        return false
      }
    } catch {
      return false
    }
  }

}
