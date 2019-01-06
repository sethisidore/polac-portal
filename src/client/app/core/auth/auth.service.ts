import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '@app/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'api';

  constructor(private http: HttpClient, private router: Router) { }

  public login(user: TokenPayload): Observable<TokenPayload> {
    return this.http.post<TokenPayload>(`${this.authUrl}/login`, user);
  }

  public register(user: User): Observable<TokenPayload> {
    return this.http.post<TokenPayload>(`${this.authUrl}/register`, user);
  }

  public logout() {
    return this.http.get(`${this.authUrl}/logout`).subscribe(() => {
      sessionStorage.removeItem('auth-token');
    });
  }

  public getUser(): TokenPayload | undefined {
    const userToken = sessionStorage.getItem('auth-token');
    let details: any;
    if (userToken) {
      details = JSON.parse(userToken);
      return details;
    } else {
      return undefined;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUser();
    return (user/* && user.expires > (Date.now() / 1000)*/) ? true : false;
  }
}

export interface TokenPayload {
  id: string;
  name?: string;
  username: string;
  password?: string;
  email?: string;
  expires: number;
  type: string;
}
