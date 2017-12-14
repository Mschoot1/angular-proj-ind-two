import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

interface LoginResponse {
  token: string;
  username: string;
}

@Injectable()
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
  }

  public loggedIn(): boolean {
    return tokenNotExpired();
  }

  public login(body) {
    return this.http.post(this.serverUrl + '/login', body, {headers: this.headers})
      .toPromise()
      .then(response => {
        localStorage.setItem('username', (response as LoginResponse).username);
        return (response as LoginResponse).token;
      })
      .catch(error => {
        return error;
      });
  }

  public register(body) {
    return this.http.post(this.serverUrl + '/register', body, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  }
}
