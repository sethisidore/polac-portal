import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = '/api/';
  constructor(private http: HttpClient, private router: Router) { }

  private request(method: 'post'|'get', type: 'login'|'register'|'logout'|'status', user?: TokenPayload): Observable<any> {
    let base: Observable<any>;
    if (method === 'post') {
      base = this.http.post(`${this.authUrl}/${type}`, user);
    } else {
      base = this.http.get(`${this.authUrl}/${type}`);
    }
    const request = base.pipe(map((data: any) => {
      return data;
    }));
    return request;
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('get', 'login', user);
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public logout(): Observable<any> {
    const req = this.request('get', 'logout');
    this.router.navigate(['/login']);
    return req;
  }

  public isLoggedIn(): Observable<any|boolean> {
    return this.request('get', 'status');
  }
}

export interface TokenPayload {
  username: string;
  password: string;
  email?: string;
}
