import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '@app/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'api/';
  constructor(private http: HttpClient, private router: Router) { }

  public login(user: TokenPayload): Observable<TokenPayload> {
    return this.http.post<TokenPayload>(`${this.authUrl}/login`, user);
  }

  public register(user: User): Observable<TokenPayload> {
    return this.http.post<TokenPayload>(`${this.authUrl}/register`, user);
  }

  public logout() {
    return this.http.get(`${this.authUrl}/logout`);
  }

  public getUser(): TokenPayload {
    const userToken = sessionStorage.getItem('my-token');
    let details;
    if (userToken) {
      details = userToken.split(',');
      details = JSON.parse(details);
      return details;
    } else {
      return undefined;
    }
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.authUrl}/status`);
  }
}

export interface TokenPayload {
  _id: string;
  username: string;
  password?: string;
  email?: string;
  expires: number;
}
